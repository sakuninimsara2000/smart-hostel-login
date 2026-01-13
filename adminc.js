// Function to submit registration to backend
async function submitRegistration() {
    try {
        // Collect all data from sessionStorage
        const step1Data = JSON.parse(sessionStorage.getItem('step1Data') || '{}');
        const step2Data = JSON.parse(sessionStorage.getItem('step2Data') || '{}');
        
        const registrationData = {
            fullname: step1Data.fullname,
            dob: step1Data.dob,
            email: step1Data.email,
            phone: step1Data.phone,
            gender: step1Data.gender,
            hostel: step2Data.hostel,
            username: step2Data.username,
            password: step2Data.password
        };
        
        console.log('Submitting registration:', registrationData);
        
        // Send to backend API
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            console.log('Registration successful:', result);
            // Clear session storage
            sessionStorage.clear();
            // Show success message (already showing via HTML)
            return true;
        } else {
            console.error('Registration failed:', result);
            alert('Registration failed: ' + (result.message || 'Unknown error'));
            return false;
        }
    } catch (error) {
        console.error('Error submitting registration:', error);
        alert('Error connecting to server. Please try again.');
        return false;
    }
}

// Function to navigate to login page
function goToLogin() {
    console.log('Navigating to login page...');
    window.location.href = 'login.html'; // Update with your actual login page
}

// Play success sound (optional - requires audio file)
function playSuccessSound() {
    // Uncomment if you have a success sound file
    // const audio = new Audio('success.mp3');
    // audio.play();
}

// Add confetti effect (optional enhancement)
function createConfetti() {
    const colors = ['#3498db', '#27ae60', '#f39c12', '#e74c3c', '#9b59b6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Initialize page
window.addEventListener('load', function() {
    // Submit registration when page loads
    submitRegistration();
    
    // Play success sound (optional)
    // playSuccessSound();
    
    // Create confetti effect (optional - uncomment to enable)
    setTimeout(createConfetti, 1000);
    
    // Log success
    console.log('Registration completed successfully!');
});

// Add keyboard shortcut - press Enter to go to login
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        goToLogin();
    }
});

// Prevent back button after successful registration
window.history.pushState(null, null, window.location.href);
window.onpopstate = function() {
    window.history.pushState(null, null, window.location.href);
    alert('Registration is complete. Please use "Go to Login" button.');
};