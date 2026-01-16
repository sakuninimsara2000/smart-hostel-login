// ================= STEP 1 - PERSONAL DETAILS =================

// Inputs
const fullnameInput = document.getElementById("fullname");
const dobInput = document.getElementById("dob");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const genderSelect = document.getElementById("gender");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// Groups
const nameGroup = document.getElementById("nameGroup");
const dobGroup = document.getElementById("dobGroup");
const emailGroup = document.getElementById("emailGroup");
const phoneGroup = document.getElementById("phoneGroup");
const genderGroup = document.getElementById("genderGroup");

// Load saved data (if user comes back)
window.addEventListener("load", () => {
    const saved = sessionStorage.getItem("personalData");
    if (saved) {
        const data = JSON.parse(saved);
        fullnameInput.value = data.fullname || "";
        dobInput.value = data.dob || "";
        emailInput.value = data.email || "";
        phoneInput.value = data.phone || "";
        genderSelect.value = data.gender || "";
    }
});

// Back button
backBtn.addEventListener("click", () => {
    if (confirm("Go back to login?")) {
        sessionStorage.clear();
        // window.location.href = "login.html";
    }
});

// Next button
nextBtn.addEventListener("click", () => {

    const fullname = fullnameInput.value.trim();
    const dob = dobInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim().replace(/-/g, "");
    const gender = genderSelect.value;

    // Reset errors
    [nameGroup, dobGroup, emailGroup, phoneGroup, genderGroup]
        .forEach(g => g.classList.remove("error"));

    let valid = true;

    if (!fullname) { nameGroup.classList.add("error"); valid = false; }
    if (!dob) { dobGroup.classList.add("error"); valid = false; }
    if (!email) { emailGroup.classList.add("error"); valid = false; }
    if (!phone) { phoneGroup.classList.add("error"); valid = false; }
    if (!gender) { genderGroup.classList.add("error"); valid = false; }

    if (!valid) {
        alert("Please fill all fields");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address");
        emailGroup.classList.add("error");
        return;
    }

    // Phone validation (Sri Lanka)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Invalid phone number");
        phoneGroup.classList.add("error");
        return;
    }

    // Save Step 1 data
    sessionStorage.setItem("personalData", JSON.stringify({
        fullname,
        dob,
        email,
        phone,
        gender
    }));

    // Go to Step 2
    window.location.href = "hosteluser.html";
});
