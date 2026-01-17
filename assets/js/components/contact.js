class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = document.getElementById('submit-button');
        this.successMessage = document.getElementById('success-message');
        this.formWrapper = document.getElementById('contact-form-wrapper');
        this.validationMessages = this.loadValidationMessages();
        
        this.validators = {
            name: this.validateName.bind(this),
            email: this.validateEmail.bind(this),
            organization: this.validateOrganization.bind(this),
            message: this.validateMessage.bind(this)
        };
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.attachEventListeners();
        this.initCharCounters();
        this.checkHoneypot();
    }
    
    loadValidationMessages() {
        const messagesScript = document.getElementById('validation-messages');
        if (messagesScript) {
            try {
                return JSON.parse(messagesScript.textContent);
            } catch (e) {
                console.error('Failed to parse validation messages:', e);
            }
        }
        return {};
    }
    
    attachEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        const inputs = this.form.querySelectorAll('input:not([type="hidden"]), textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                this.validateField(e.target);
            });
            
            input.addEventListener('input', (e) => {
                const fieldName = e.target.name;
                if (fieldName && this.validators[fieldName]) {
                    this.clearError(e.target);
                }
            });
        });
    }
    
    initCharCounters() {
        const textareas = this.form.querySelectorAll('textarea[maxlength]');
        textareas.forEach(textarea => {
            const maxLength = parseInt(textarea.getAttribute('maxlength'));
            const counter = textarea.parentElement.querySelector('.char-count');
            
            if (counter) {
                textarea.addEventListener('input', () => {
                    const currentLength = textarea.value.length;
                    counter.textContent = currentLength;
                    
                    counter.classList.remove('char-warning', 'char-limit');
                    if (currentLength > maxLength * 0.9) {
                        counter.classList.add('char-warning');
                    }
                    if (currentLength >= maxLength) {
                        counter.classList.add('char-limit');
                    }
                });
            }
        });
    }
    
    checkHoneypot() {
        const honeypot = this.form.querySelector('[name="_gotcha"]');
        if (honeypot) {
            setInterval(() => {
                if (honeypot.value !== '') {
                    console.warn('Honeypot triggered - potential bot detected');
                }
            }, 1000);
        }
    }
    
    validateField(field) {
        const fieldName = field.name;
        if (!fieldName || !this.validators[fieldName]) return true;
        
        return this.validators[fieldName](field);
    }
    
    validateName(field) {
        const value = field.value.trim();
        const messages = this.validationMessages.name || {};
        
        if (!value) {
            this.showError(field, messages.required || 'Please enter your full name');
            return false;
        }
        
        if (value.length < 2) {
            this.showError(field, messages.min_length || 'Name must be at least 2 characters');
            return false;
        }
        
        const namePattern = /^[a-zA-Z\s\-'\.]+$/;
        if (!namePattern.test(value)) {
            this.showError(field, messages.pattern || 'Please enter a valid name');
            return false;
        }
        
        this.clearError(field);
        this.markValid(field);
        return true;
    }
    
    validateEmail(field) {
        const value = field.value.trim();
        const messages = this.validationMessages.email || {};
        
        if (!value) {
            this.showError(field, messages.required || 'Please enter your email address');
            return false;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            this.showError(field, messages.invalid || 'Please enter a valid email address');
            return false;
        }
        
        this.clearError(field);
        this.markValid(field);
        return true;
    }
    
    validateOrganization(field) {
        const value = field.value.trim();
        const maxLength = parseInt(field.getAttribute('maxlength')) || 150;
        const messages = this.validationMessages.organization || {};
        
        if (value && value.length > maxLength) {
            this.showError(field, messages.max_length || 'Organization name is too long');
            return false;
        }
        
        if (value) {
            this.markValid(field);
        } else {
            this.clearError(field);
        }
        return true;
    }
    
    validateMessage(field) {
        const value = field.value.trim();
        const messages = this.validationMessages.message || {};
        const maxLength = parseInt(field.getAttribute('maxlength')) || 2000;
        
        if (!value) {
            this.showError(field, messages.required || 'Please enter your message');
            return false;
        }
        
        if (value.length < 10) {
            this.showError(field, messages.min_length || 'Message must be at least 10 characters');
            return false;
        }
        
        if (value.length > maxLength) {
            this.showError(field, messages.max_length || `Message must not exceed ${maxLength} characters`);
            return false;
        }
        
        this.clearError(field);
        this.markValid(field);
        return true;
    }
    
    validateForm() {
        let isValid = true;
        
        const fields = ['name', 'email', 'message'];
        fields.forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field && this.validators[fieldName]) {
                const fieldValid = this.validators[fieldName](field);
                if (!fieldValid) {
                    isValid = false;
                }
            }
        });
        
        const orgField = this.form.querySelector('[name="organization"]');
        if (orgField && orgField.value.trim()) {
            const orgValid = this.validateOrganization(orgField);
            if (!orgValid) {
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    showError(field, message) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        formGroup.classList.add('has-error');
        formGroup.classList.remove('is-valid');
        
        const errorElement = formGroup.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    clearError(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        formGroup.classList.remove('has-error');
        
        const errorElement = formGroup.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    markValid(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        formGroup.classList.add('is-valid');
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            const firstError = this.form.querySelector('.has-error input, .has-error textarea, .has-error select');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        const honeypot = this.form.querySelector('[name="_gotcha"]');
        if (honeypot && honeypot.value !== '') {
            console.warn('Bot detected via honeypot');
            return;
        }
        
        this.setLoadingState(true);
        
        try {
            const formData = new FormData(this.form);
            
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showSuccess();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again or contact me directly via email.');
            this.setLoadingState(false);
        }
    }
    
    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.classList.add('is-loading');
            this.form.classList.add('form-submitting');
        } else {
            this.submitButton.disabled = false;
            this.submitButton.classList.remove('is-loading');
            this.form.classList.remove('form-submitting');
        }
    }
    
    showSuccess() {
        this.form.classList.add('form-hidden');
        
        this.successMessage.classList.add('show');
        
        if (window.lucide) {
            window.lucide.createIcons();
        }
        
        this.formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        setTimeout(() => {
            this.form.reset();
            this.clearAllErrors();
            this.setLoadingState(false);
        }, 1000);
    }
    
    clearAllErrors() {
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('has-error', 'is-valid');
        });
        
        const errorElements = this.form.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.textContent = '';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});