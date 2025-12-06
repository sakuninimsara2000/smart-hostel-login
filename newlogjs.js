const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (!email || !pass) {
    alert('Please enter both E-mail/ID and password.');
    return;
  }

  alert('Login submitted — implement authentication next.');
});
