//const header = document.querySelector('.header');
//let lastScrollTop = 0;
//let isHeaderVisible = true;
//
//// Header scroll behavior
//window.addEventListener('scroll', () => {
//    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
//
//    // Determine scroll direction
//    const isScrollingDown = currentScrollTop > lastScrollTop;
//    const isScrollingUp = currentScrollTop < lastScrollTop;
//
//    // Check if we're not at the top of the page
//    const isNotAtTop = currentScrollTop > 0;
//
//    if (isScrollingDown && isNotAtTop) {
//        // Scrolling down - hide header
//        header.style.transform = 'translateY(-100%)';
//        header.style.opacity = '0';
//        isHeaderVisible = false;
//    } else if (isScrollingUp) {
//        // Scrolling up - show header with background
//        header.style.transform = 'translateY(0)';
//        header.style.opacity = '1';
//        header.style.backgroundColor = 'rgba(var(--background-rgb), 0.75)';
//        isHeaderVisible = true;
//    }
//
//    // If back to top, remove background
//    if (currentScrollTop === 0) {
//        header.style.backgroundColor = 'transparent';
//    }
//
//    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
//});

const header = document.querySelector('.header');
let lastScrollTop = 0;
let isHeaderVisible = true;

window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    // Determine scroll direction
    const isScrollingDown = currentScrollTop > lastScrollTop;
    const isScrollingUp = currentScrollTop < lastScrollTop;
    const isNotAtTop = currentScrollTop > 0;

    if (isScrollingDown && isNotAtTop) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
        header.style.opacity = '0';
        isHeaderVisible = false;
    } else if (isScrollingUp) {
        // Scrolling up - show header with blur effect
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
        header.classList.add('scrolled');
        isHeaderVisible = true;
    }

    // If back to top, remove background and blur
    if (currentScrollTop === 0) {
        header.classList.remove('scrolled');
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
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
    root.setAttribute('data-theme', actualTheme); // Set data-theme

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

document.addEventListener('DOMContentLoaded', function () {
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

    form.addEventListener('submit', function (e) {
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
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    //document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //    anchor.addEventListener('click', function (e) {
    //        e.preventDefault();
//
    //        document.querySelector(this.getAttribute('href')).scrollIntoView({
    //            behavior: 'smooth'
    //        });
    //    });
    //});
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.indicator-dot');
    const goToTop = document.getElementById('goToTop');
    const prevSection = document.getElementById('prevSection');
    const nextSection = document.getElementById('nextSection');
    const goToBottom = document.getElementById('goToBottom');
    
    // Helper function to get current section index
    function getCurrentSectionIndex() {
        const scrollPosition = window.scrollY;
        let currentIndex = 0;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - sectionHeight / 3) {
                currentIndex = index;
            }
        });
        
        return currentIndex;
    }
    
    // Update active dot
    function updateActiveDot() {
        const currentIndex = getCurrentSectionIndex();
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Scroll to section
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Button click handlers
    goToTop.addEventListener('click', () => {
        scrollToSection(0);
    });
    
    goToBottom.addEventListener('click', () => {
        scrollToSection(sections.length - 1);
    });
    
    prevSection.addEventListener('click', () => {
        const currentIndex = getCurrentSectionIndex();
        scrollToSection(currentIndex - 1);
    });
    
    nextSection.addEventListener('click', () => {
        const currentIndex = getCurrentSectionIndex();
        scrollToSection(currentIndex + 1);
    });
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSection(index);
        });
    });
    
    // Update active dot on scroll
    window.addEventListener('scroll', () => {
        updateActiveDot();
    });
    
    // Initial update
    updateActiveDot();
});

// Add these new event listeners
const hamburger = document.querySelector('.hamburger');
const mobileMenuContainer = document.querySelector('.mobile-menu-container');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenuContainer.classList.toggle('active');
    // Prevent body scrolling when menu is open
    document.body.style.overflow = mobileMenuContainer.classList.contains('active') ? 'hidden' : '';
});

// Close menu when a link is clicked
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenuContainer.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && 
        !mobileMenuContainer.contains(event.target) && 
        mobileMenuContainer.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenuContainer.classList.remove('active');
        document.body.style.overflow = '';
    }
});