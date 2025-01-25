const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) {
        mobileMenu.classList.remove('active');
    }
});

const themeToggle = document.getElementById('theme-toggle');
const themeDropdown = document.querySelector('.theme-dropdown');
const themeOptions = document.querySelectorAll('.theme-option');
const root = document.documentElement;

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    const actualTheme = theme === 'system' ? getSystemTheme() : theme;
    
    const themePrefix = actualTheme === 'dark' ? '--dark-' : '--light-';
    const cssVars = ['background', 'background-rgb', 'background-secondary', 'accent', 'text', 'text-rgb', 'text-secondary', 'overlay-bg', 'hover-bg', 'border-color'];
    
    cssVars.forEach(variable => {
        const value = getComputedStyle(root).getPropertyValue(`${themePrefix}${variable}`);
        root.style.setProperty(`--${variable}`, value);
    });

    const icons = {
        'light': 'fa-sun',
        'dark': 'fa-moon',
        'system': 'fa-desktop'
    };
    
    const toggleIcon = themeToggle.querySelector('i');
    toggleIcon.className = `fas ${icons[theme]}`;
    
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'system';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    themeDropdown.classList.toggle('show');
});

themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        setTheme(theme);
        themeDropdown.classList.remove('show');
    });
});

document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target)) {
        themeDropdown.classList.remove('show');
    }
});

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') {
            setTheme('system');
        }
    });

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('name-error');
        
        if (name.length < 2) {
            nameInput.parentElement.classList.add('error');
            nameError.textContent = 'Name must be at least 2 characters long';
            return false;
        }
        
        nameInput.parentElement.classList.remove('error');
        nameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            emailInput.parentElement.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        
        emailInput.parentElement.classList.remove('error');
        emailError.textContent = '';
        return true;
    }

    function validateSubject() {
        const subject = subjectInput.value.trim();
        const subjectError = document.getElementById('subject-error');
        
        if (subject.length < 3) {
            subjectInput.parentElement.classList.add('error');
            subjectError.textContent = 'Subject must be at least 3 characters long';
            return false;
        }
        
        if (subject.length > 100) {
            subjectInput.parentElement.classList.add('error');
            subjectError.textContent = 'Subject cannot exceed 100 characters';
            return false;
        }
        
        subjectInput.parentElement.classList.remove('error');
        subjectError.textContent = '';
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const messageError = document.getElementById('message-error');
        
        if (message.length < 10) {
            messageInput.parentElement.classList.add('error');
            messageError.textContent = 'Message must be at least 10 characters long';
            return false;
        }
        
        if (message.length > 1000) {
            messageInput.parentElement.classList.add('error');
            messageError.textContent = 'Message cannot exceed 1000 characters';
            return false;
        }
        
        messageInput.parentElement.classList.remove('error');
        messageError.textContent = '';
        return true;
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    subjectInput.addEventListener('input', validateSubject);
    messageInput.addEventListener('input', validateMessage);

    form.addEventListener('submit', function(e) {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            e.preventDefault();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const content = entry.target.querySelector('.content');
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
            } else {
                entry.target.classList.remove('active');
                const content = entry.target.querySelector('.content');
                content.style.transform = 'translateY(30px)';
                content.style.opacity = '0';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});