// ===== ACCOUNT PAGE SCRIPT =====

// Highlight active sidebar link
document.querySelectorAll(".menu li a").forEach(link => {
  if (link.href === window.location.href) {
    link.parentElement.classList.add("active");
  }
});

// ===== PROFILE PHOTO UPLOAD + PREVIEW =====
const changePhotoBtn = document.querySelector(".btn-change");
const uploadInput = document.createElement("input");
uploadInput.type = "file";
uploadInput.accept = "image/*";
uploadInput.style.display = "none";
document.body.appendChild(uploadInput);

const profilePreview = document.getElementById("profilePreview");
const defaultIcon = document.getElementById("defaultIcon");

// Open file picker when button is clicked
changePhotoBtn.addEventListener("click", () => {
  uploadInput.click();
});

// When a file is chosen
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      profilePreview.src = event.target.result;
      profilePreview.style.display = "block";
      defaultIcon.style.display = "none";

      // Optional: save to localStorage for persistence
      localStorage.setItem("profileImage", event.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// ===== LOAD SAVED PROFILE PHOTO (if exists) =====
window.addEventListener("DOMContentLoaded", () => {
  const savedPhoto = localStorage.getItem("profileImage");
  if (savedPhoto && profilePreview && defaultIcon) {
    profilePreview.src = savedPhoto;
    profilePreview.style.display = "block";
    defaultIcon.style.display = "none";
  }
});
