// Form validation function
function validateForm() {
    const fullname = document.getElementById('fullname').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value;

    if (!fullname) {
        alert('Please enter your full name');
        return false;
    }

    if (!dob) {
        alert('Please select your date of birth');
        return false;
    }

    if (!email) {
        alert('Please enter your email');
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!phone) {
        alert('Please enter your phone number');
        return false;
    }

    if (!gender) {
        alert('Please select your gender');
        return false;
    }

    return true;
}

// Next step function
function nextStep() {
    if (validateForm()) {
        const formData = {
            fullname: document.getElementById('fullname').value,
            dob: document.getElementById('dob').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            gender: document.getElementById('gender').value
        };
        
        // Store data in sessionStorage
        sessionStorage.setItem('step1Data', JSON.stringify(formData));
        console.log('Step 1 Data Saved:', formData);
        
        // Navigate to step 2
        window.location.href = 'adminuser.html';
    }
}

// Back to login function
function backToLogin() {
    if (confirm('Are you sure you want to go back to login? Any entered data will be lost.')) {
        sessionStorage.clear();
        window.location.href = 'login.html'; // Update with your login page
    }
}

// Phone number formatting
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    if (value.length >= 4) {
        value = value.slice(0, 4) + '-' + value.slice(4);
    }
    e.target.value = value;
});

// Add enter key support for form submission
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        nextStep();
    }
});

// Load saved data if returning to this page
window.addEventListener('load', function() {
    const savedData = sessionStorage.getItem('step1Data');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('fullname').value = data.fullname || '';
        document.getElementById('dob').value = data.dob || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('gender').value = data.gender || '';
    }
});