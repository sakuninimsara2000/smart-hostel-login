// Toggle password visibility
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const toggleIcon = passwordField.nextElementSibling;
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.textContent = '🔓';
    } else {
        passwordField.type = 'password';
        toggleIcon.textContent = '🔒';
    }
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    
    return strength;
}

// Form validation function
function validateForm() {
    const hostel = document.getElementById('hostel').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!hostel) {
        alert('Please select your hostel');
        return false;
    }

    if (!username) {
        alert('Please enter a username');
        return false;
    }

    if (username.length < 4) {
        alert('Username must be at least 4 characters long');
        return false;
    }

    if (!password) {
        alert('Please enter a password');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    }

    const passwordStrength = checkPasswordStrength(password);
    if (passwordStrength < 3) {
        alert('Password is too weak. Please use a combination of uppercase, lowercase, numbers, and special characters.');
        return false;
    }

    if (!confirmPassword) {
        alert('Please confirm your password');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    return true;
}

// Next step function
function nextStep() {
    if (validateForm()) {
        const formData = {
            hostel: document.getElementById('hostel').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        
        // Store step 2 data
        sessionStorage.setItem('step2Data', JSON.stringify(formData));
        console.log('Step 2 Data Saved:', formData);
        
        // Navigate to confirmation page
        window.location.href = 'adminconfirm.html';
    }
}

// Back to previous step
function backToPrevious() {
    window.location.href = 'adminreg.html';
}

// Back to login function
function backToLogin() {
    if (confirm('Are you sure you want to go back to login? Any entered data will be lost.')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

// Real-time password matching indicator
document.getElementById('confirm-password').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            this.style.borderColor = '#27ae60';
        } else {
            this.style.borderColor = '#e74c3c';
        }
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

// Password strength indicator
document.getElementById('password').addEventListener('input', function() {
    const strength = checkPasswordStrength(this.value);
    
    if (this.value.length > 0) {
        if (strength < 2) {
            this.style.borderColor = '#e74c3c';
        } else if (strength < 4) {
            this.style.borderColor = '#f39c12';
        } else {
            this.style.borderColor = '#27ae60';
        }
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

// Add enter key support for form submission
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        nextStep();
    }
});

// Load saved data if returning to this page
window.addEventListener('load', function() {
    const savedData = sessionStorage.getItem('step2Data');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('hostel').value = data.hostel || '';
        document.getElementById('username').value = data.username || '';
        // Don't restore password for security
    }
});