// ================= STEP 2 - USER CREDENTIALS =================

// Inputs
const hostelSelect = document.getElementById("hostelName");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// Groups
const hostelGroup = document.getElementById("hostelGroup");
const usernameGroup = document.getElementById("usernameGroup");
const passwordGroup = document.getElementById("passwordGroup");
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");

// 🔐 Protect Step 2
window.addEventListener("load", () => {
    const personalData = sessionStorage.getItem("personalData");
    if (!personalData) {
        alert("Please complete Step 1 first!");
        window.location.href = "hostelregistration.html";
    }
});

// Back to Step 1
backBtn.addEventListener("click", () => {
    window.location.href = "hostelregistration.html";
});

// Next button
nextBtn.addEventListener("click", () => {

    const hostelName = hostelSelect.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    [hostelGroup, usernameGroup, passwordGroup, confirmPasswordGroup]
        .forEach(g => g.classList.remove("error"));

    if (!hostelName) {
        hostelGroup.classList.add("error");
        alert("Select hostel");
        return;
    }

    if (!username || username.length < 4) {
        usernameGroup.classList.add("error");
        alert("Username must be at least 4 characters");
        return;
    }

    if (!password || password.length < 6) {
        passwordGroup.classList.add("error");
        alert("Password must be at least 6 characters");
        return;
    }

    if (password !== confirmPassword) {
        passwordGroup.classList.add("error");
        confirmPasswordGroup.classList.add("error");
        alert("Passwords do not match");
        return;
    }

    // Strong password check
    if (!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password))) {
        alert("Password must contain Uppercase, Lowercase and Number");
        return;
    }

    // Combine Step 1 + Step 2
    const personalData = JSON.parse(sessionStorage.getItem("personalData"));

    sessionStorage.setItem("registrationData", JSON.stringify({
        ...personalData,
        hostelName,
        username,
        password
    }));

    // Go to Step 3
    window.location.href = "hostelconf.html";
});
