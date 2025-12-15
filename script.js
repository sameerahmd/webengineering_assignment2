document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');

    // Input fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const genderMale = document.getElementById('male');
    const genderFemale = document.getElementById('female');
    const country = document.getElementById('country');
    const terms = document.getElementById('terms');

    // Validation status
    const validationStatus = {
        firstName: false,
        email: false,
        password: false,
        confirmPassword: false,
        gender: true,
        country: false,
        terms: true,
    };

    // --- UTILITY FUNCTIONS ---
    function showError(field, message) {
        let errorContainer = document.getElementById(`${field.id}Error`);
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = `${field.id}Error`;
            errorContainer.classList.add('error-message');
            field.parentNode.appendChild(errorContainer);
        }
        errorContainer.textContent = message;
    }

    function clearError(field) {
        const errorContainer = document.getElementById(`${field.id}Error`);
        if (errorContainer) {
            errorContainer.textContent = '';
        }
    }

    function checkFormValidity() {
        const allValid = Object.values(validationStatus).every(status => status);
        submitButton.disabled = !allValid;
    }

    // --- VALIDATION LOGIC ---
    function validateFirstName() {
        if (firstName.value.length >= 5) {
            validationStatus.firstName = true;
            clearError(firstName);
        } else {
            validationStatus.firstName = false;
            showError(firstName, 'First Name must be at least 5 characters.');
        }
        checkFormValidity();
    }

    function validateEmail() {
        if (email.value.includes('@')) {
            validationStatus.email = true;
            clearError(email);
        } else {
            validationStatus.email = false;
            showError(email, 'Email must contain "@".');
        }
        checkFormValidity();
    }

    function validatePassword() {
        const hasUpperCase = /[A-Z]/.test(password.value);
        if (password.value.length >= 8 && hasUpperCase) {
            validationStatus.password = true;
            clearError(password);
        } else {
            validationStatus.password = false;
            showError(password, 'Password must be at least 8 characters and contain one uppercase letter.');
        }
        validateConfirmPassword(); // Re-validate confirm password
        checkFormValidity();
    }

    function validateConfirmPassword() {
        if (confirmPassword.value === password.value && confirmPassword.value.length > 0) {
            validationStatus.confirmPassword = true;
            clearError(confirmPassword);
        } else {
            validationStatus.confirmPassword = false;
            showError(confirmPassword, 'Passwords do not match.');
        }
        checkFormValidity();
    }

    function validateGender() {
        if (genderMale.checked || genderFemale.checked) {
            validationStatus.gender = true;
            // Since there's no single element for gender, we'll manually find a place for the error
            const genderErrorContainer = document.getElementById('genderError');
            if (genderErrorContainer) genderErrorContainer.textContent = '';
        } else {
            validationStatus.gender = false;
            const genderErrorContainer = document.getElementById('genderError');
            if (genderErrorContainer) genderErrorContainer.textContent = 'Please select a gender.';
        }
        checkFormValidity();
    }

    function validateCountry() {
        if (country.value !== "") {
            validationStatus.country = true;
            clearError(country);
        } else {
            validationStatus.country = false;
            showError(country, 'Please select a country.');
        }
        checkFormValidity();
    }

    function validateTerms() {
        if (terms.checked) {
            validationStatus.terms = true;
            clearError(terms);
        } else {
            validationStatus.terms = false;
            showError(terms, 'You must accept the terms and conditions.');
        }
        checkFormValidity();
    }

    // --- EVENT LISTENERS ---
    firstName.addEventListener('input', validateFirstName);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);
    country.addEventListener('change', validateCountry);
    terms.addEventListener('change', validateTerms);
    genderMale.addEventListener('change', validateGender);
    genderFemale.addEventListener('change', validateGender);

    // --- FORM SUBMISSION ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let summaryDiv = document.getElementById('summary');
        if (!summaryDiv) {
            summaryDiv = document.createElement('div');
            summaryDiv.id = 'summary';
            form.parentNode.appendChild(summaryDiv);
        }
        
        summaryDiv.innerHTML = ''; // Clear previous summary

        const summaryTitle = document.createElement('h2');
        summaryTitle.textContent = 'Registration Successful!';
        summaryDiv.appendChild(summaryTitle);

        const nameP = document.createElement('p');
        nameP.textContent = `Name: ${firstName.value} ${lastName.value || ''} ${surname.value || ''}`.trim();
        summaryDiv.appendChild(nameP);

        const emailP = document.createElement('p');
        emailP.textContent = `Email: ${email.value}`;
        summaryDiv.appendChild(emailP);

        const countryP = document.createElement('p');
        const selectedCountry = country.options[country.selectedIndex].text;
        countryP.textContent = `Country: ${selectedCountry}`;
        summaryDiv.appendChild(countryP);

        const genderP = document.createElement('p');
        const selectedGender = genderMale.checked ? 'Male' : 'Female';
        genderP.textContent = `Gender: ${selectedGender}`;
        summaryDiv.appendChild(genderP);

        form.reset();
        Object.keys(validationStatus).forEach(key => {
            validationStatus[key] = false
        });
        validationStatus.gender = true;
        validationStatus.terms = true;
        checkFormValidity();
    });

    checkFormValidity();
});
