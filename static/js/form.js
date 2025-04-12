export class ContactFormValidator {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.subjectInput = document.getElementById('subject');
        this.messageInput = document.getElementById('message');

        this.initializeValidation();
    }

    initializeValidation() {
        this.nameInput.addEventListener('input', () => this.validateName());
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.subjectInput.addEventListener('input', () => this.validateSubject());
        this.messageInput.addEventListener('input', () => this.validateMessage());

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateName() {
        const name = this.nameInput.value.trim();
        const nameError = document.getElementById('name-error');

        if (name.length < 2) {
            this.nameInput.parentElement.classList.add('error');
            nameError.textContent = 'Name must be at least 2 characters long';
            return false;
        }

        this.nameInput.parentElement.classList.remove('error');
        nameError.textContent = '';
        return true;
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            this.emailInput.parentElement.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }

        this.emailInput.parentElement.classList.remove('error');
        emailError.textContent = '';
        return true;
    }

    validateSubject() {
        const subject = this.subjectInput.value.trim();
        const subjectError = document.getElementById('subject-error');

        if (subject.length < 3) {
            this.subjectInput.parentElement.classList.add('error');
            subjectError.textContent = 'Subject must be at least 3 characters long';
            return false;
        }

        if (subject.length > 100) {
            this.subjectInput.parentElement.classList.add('error');
            subjectError.textContent = 'Subject cannot exceed 100 characters';
            return false;
        }

        this.subjectInput.parentElement.classList.remove('error');
        subjectError.textContent = '';
        return true;
    }

    validateMessage() {
        const message = this.messageInput.value.trim();
        const messageError = document.getElementById('message-error');

        if (message.length < 10) {
            this.messageInput.parentElement.classList.add('error');
            messageError.textContent = 'Message must be at least 10 characters long';
            return false;
        }

        if (message.length > 1000) {
            this.messageInput.parentElement.classList.add('error');
            messageError.textContent = 'Message cannot exceed 1000 characters';
            return false;
        }

        this.messageInput.parentElement.classList.remove('error');
        messageError.textContent = '';
        return true;
    }

    handleSubmit(e) {
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isSubjectValid = this.validateSubject();
        const isMessageValid = this.validateMessage();

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            e.preventDefault();
        }
    }
}