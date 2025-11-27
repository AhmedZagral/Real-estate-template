// ===================================
// CONTACT FORM HANDLING
// LuxeState Real Estate Template
// ===================================

// Get the contact form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Log data (for development)
            console.log('Form submitted with data:', formData);
            
            // In production, send data to your server:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                showFormMessage('success', 'Thank you! Your message has been sent.');
                contactForm.reset();
            })
            .catch(error => {
                showFormMessage('error', 'Sorry, there was an error. Please try again.');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
            */
            
        }, 1500);
    });
}

// Form validation function
function validateForm(data) {
    // Clear previous errors
    clearFormErrors();
    
    let isValid = true;
    
    // Validate first name
    if (data.firstName.length < 2) {
        showFieldError('firstName', 'Please enter a valid first name');
        isValid = false;
    }
    
    // Validate last name
    if (data.lastName.length < 2) {
        showFieldError('lastName', 'Please enter a valid last name');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!data.subject) {
        showFieldError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (data.message.length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Add error class
    field.classList.add('error');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    // Insert error message
    formGroup.appendChild(errorDiv);
}

// Clear all form errors
function clearFormErrors() {
    const errorFields = document.querySelectorAll('.form-control.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(msg => msg.remove());
    
    const formMessages = document.querySelectorAll('.form-message');
    formMessages.forEach(msg => msg.remove());
}

// Show form message (success/error)
function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            ${type === 'success' 
                ? '<circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/><path d="M6 10l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
                : '<circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/><path d="M10 6v5M10 14v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
            }
        </svg>
        <span>${message}</span>
    `;
    
    // Insert before submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    contactForm.insertBefore(messageDiv, submitButton);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Newsletter form handling
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value.trim();
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // In production, send to your API
            console.log('Newsletter subscription:', email);
        }, 1000);
    });
});

// Sidebar search form
const sidebarSearch = document.querySelector('.sidebar-search');

if (sidebarSearch) {
    sidebarSearch.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchInput = this.querySelector('.sidebar-search-input');
        const query = searchInput.value.trim();
        
        if (query.length > 0) {
            console.log('Searching for:', query);
            // In production, implement search functionality
            alert(`Searching for: ${query}`);
        }
    });
}

console.log('Contact form scripts loaded ✓');
