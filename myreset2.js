// Get form elements
const resetForm = document.getElementById('resetForm');
const resetAlertBox = document.getElementById('resetAlertBox');
const resetEmailInput = document.getElementById('resetEmail');
const backToLoginBtn = document.getElementById('backToLogin');

// Show alert function
function showAlert(message, type) {
  resetAlertBox.textContent = message;
  resetAlertBox.className = `alert alert-${type}`;
  resetAlertBox.style.display = 'block';
  
  setTimeout(() => {
    resetAlertBox.style.display = 'none';
  }, 4000);
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form submission handler
resetForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = resetEmailInput.value.trim();
  
  // Validation
  if (!email) {
    showAlert('Please enter your email address', 'error');
    resetEmailInput.focus();
    return;
  }
  
  if (!isValidEmail(email)) {
    showAlert('Please enter a valid email address', 'error');
    resetEmailInput.focus();
    return;
  }
  
  // Show loading state
  const submitBtn = resetForm.querySelector('button[type="submit"]');
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Simulate sending reset link
  setTimeout(() => {
    showAlert(`Reset link sent to ${email}`, 'success');
    
    // Add fade-out animation
    document.querySelector('.container').classList.add('fade-out');
    
    // Redirect to login page after success
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
    
  }, 1000);
});

// Back to login button handler
backToLoginBtn.addEventListener('click', function() {
  document.querySelector('.container').classList.add('fade-out');
  
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 500);
});

// Clear error when user starts typing
resetEmailInput.addEventListener('input', () => {
  if (resetAlertBox.style.display === 'block') {
    resetAlertBox.style.display = 'none';
  }
});

// Handle Enter key
resetEmailInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    resetForm.dispatchEvent(new Event('submit'));
  }
});