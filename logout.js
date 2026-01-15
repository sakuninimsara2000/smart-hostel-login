// ===== GLOBAL LOGOUT FUNCTION =====
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const confirmLogout = confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        // Clear any saved session or profile data
        localStorage.clear();
        sessionStorage.clear();

        alert("You have been logged out successfully.");

        // Redirect to logout confirmation page
        window.location.href = "loggedout.html";
      }
    });
  }
});
