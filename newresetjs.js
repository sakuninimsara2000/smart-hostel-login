const resetForm = document.getElementById('resetForm');

resetForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  if (!email) {
    alert('Please enter your email address.');
    return;
  }

  const page = document.querySelector('.page');
  page.classList.add('fade-out');

  setTimeout(() => {
    alert('Reset link sent to ' + email);
    window.location.href = 'newlog.html';
  }, 500);
});

function goLogin() {
  const page = document.querySelector('.page');
  page.classList.add('fade-out');

  setTimeout(() => {
    window.location.href = "newlog.html"; 
  }, 500);
}
