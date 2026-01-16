// Get form elements
const loginForm = document.getElementById('loginForm');
const alertBox = document.getElementById('alertBox');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginAsSelect = document.getElementById('loginAs');
const rememberCheckbox = document.getElementById('remember');

// Show alert function
function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type}`;
  alertBox.style.display = 'block';
  
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 4000);
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if input is university ID (example: starts with number)
function isUniversityID(input) {
  return /^\d/.test(input);
}

// Load saved credentials if "Remember me" was checked
window.addEventListener('DOMContentLoaded', () => {
  const savedEmail = localStorage.getItem('rememberedEmail');
  const savedLoginAs = localStorage.getItem('rememberedLoginAs');
  
  if (savedEmail) {
    emailInput.value = savedEmail;
    rememberCheckbox.checked = true;
  }
  
  if (savedLoginAs) {
    loginAsSelect.value = savedLoginAs;
  }
});

// Form submission handler
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const loginAs = loginAsSelect.value;
  
  // Validation
  if (!email) {
    showAlert('Please enter your email or university ID', 'error');
    emailInput.focus();
    return;
  }
  
  if (!password) {
    showAlert('Please enter your password', 'error');
    passwordInput.focus();
    return;
  }
  
  if (password.length < 6) {
    showAlert('Password must be at least 6 characters', 'error');
    passwordInput.focus();
    return;
  }
  
  // Validate email format (if not university ID)
  if (!isUniversityID(email) && !isValidEmail(email)) {
    showAlert('Please enter a valid email address', 'error');
    emailInput.focus();
    return;
  }
  
  // Handle "Remember me"
  if (rememberCheckbox.checked) {
    localStorage.setItem('rememberedEmail', email);
    localStorage.setItem('rememberedLoginAs', loginAs);
  } else {
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedLoginAs');
  }
  
  // Show loading state
  const submitBtn = loginForm.querySelector('button[type="submit"]');
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Simulate login process
  setTimeout(() => {
    // Here you would implement actual authentication
    // For demo purposes, we'll just show success
    
    showAlert(`Login successful as ${loginAs}!`, 'success');
    
    // Add fade-out animation
    document.querySelector('.container').classList.add('fade-out');
    
    // Redirect after animation (in real app, redirect to dashboard)
    setTimeout(() => {
      console.log('Redirecting to dashboard...');
      // window.location.href = 'dashboard.html';
      
      // For demo, reset the form
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      document.querySelector('.container').classList.remove('fade-out');
    }, 1500);
    
  }, 1000);
});

// Clear error when user starts typing
emailInput.addEventListener('input', () => {
  if (alertBox.style.display === 'block') {
    alertBox.style.display = 'none';
  }
});

passwordInput.addEventListener('input', () => {
  if (alertBox.style.display === 'block') {
    alertBox.style.display = 'none';
  }
});

// Handle Enter key in form fields
const formInputs = loginForm.querySelectorAll('input, select');
formInputs.forEach((input, index) => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < formInputs.length - 1) {
        formInputs[index + 1].focus();
      } else {
        loginForm.dispatchEvent(new Event('submit'));
      }
    }
  });
});