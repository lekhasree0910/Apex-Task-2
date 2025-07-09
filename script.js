document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Function to show an error message
    function showError(element, message, inputField) {
        element.textContent = message;
        element.classList.add('visible');
        inputField.classList.add('invalid');
    }

    // Function to hide an error message
    function hideError(element, inputField) {
        element.textContent = '';
        element.classList.remove('visible');
        inputField.classList.remove('invalid');
    }

    // Validate Name
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required.', nameInput);
            return false;
        } else {
            hideError(nameError, nameInput);
            return true;
        }
    }

    // Validate Email
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email is required.', emailInput);
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.', emailInput);
            return false;
        } else {
            hideError(emailError, emailInput);
            return true;
        }
    }

    // Validate Message
    function validateMessage() {
        if (messageInput.value.trim() === '') {
            showError(messageError, 'Message is required.', messageInput);
            return false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters long.', messageInput);
            return false;
        } else {
            hideError(messageError, messageInput);
            return true;
        }
    }

    // Add real-time validation on input change or blur
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName); // Also validate when user leaves field

    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);

    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);

    // Form submission validation
    form.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Run all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If all fields are valid, then "submit" the form (in a real app, this would send data to a server)
        if (isNameValid && isEmailValid && isMessageValid) {
            alert('Form submitted successfully!');
            form.reset(); // Clear the form after successful submission
            // In a real application, you would send the form data to a server here using fetch() or XMLHttpRequest
            console.log('Form Data:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: messageInput.value.trim()
            });
        } else {
            alert('Please correct the errors in the form.');
        }
    });
});