// Get all elements by ID
const mainContainer = document.getElementById('mainContainer');
const headerSection = document.getElementById('headerSection');
const headerIcon = document.getElementById('headerIcon');
const stepperSection = document.getElementById('stepperSection');
const successSection = document.getElementById('successSection');
const successIconWrapper = document.getElementById('successIconWrapper');
const successIcon = document.getElementById('successIcon');
const successTitle = document.getElementById('successTitle');
const buttonWrapper = document.getElementById('buttonWrapper');
const loginBtn = document.getElementById('loginBtn');

// Get step elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const stepNumber1 = document.getElementById('stepNumber1');
const stepNumber2 = document.getElementById('stepNumber2');
const stepNumber3 = document.getElementById('stepNumber3');

// Check if registration was completed
window.addEventListener('load', function() {
    const registrationData = sessionStorage.getItem('registrationData');
    
    if (!registrationData) {
        // If accessed directly without completing registration
        alert('Please complete the registration process first!');
        window.location.href = 'index.html';
        return;
    }
    
    // Display complete registration data in console
    const data = JSON.parse(registrationData);
    console.log('✅ Final Registration Data:', {
        fullname: data.fullname,
        dob: data.dob,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        hostelName: data.hostelName,
        username: data.username,
        password: '***hidden for security***',
        timestamp: new Date().toISOString(),
        status: 'completed'
    });
    
    // Show success message in console
    console.log('%c🎉 Registration Completed Successfully! 🎉', 
        'color: #3498db; font-size: 20px; font-weight: bold; padding: 10px;');
    
    // Trigger animations
    setTimeout(() => {
        createConfetti();
    }, 800);
    
    animateStepCompletion();
});

// Login button click event
loginBtn.addEventListener('click', function() {
    if (confirm('Ready to login with your new account?')) {
        // Clear all stored registration data
        sessionStorage.clear();
        
        console.log('Session data cleared. Redirecting to login...');
        
        // Add a fade out animation before redirecting
        mainContainer.style.animation = 'fadeOut 0.5s ease-out';
        
        setTimeout(() => {
            alert('Redirecting to login page...');
            // Redirect to your login page
            // window.location.href = 'login.html';
            
            // For demo, reload to step 1
            window.location.href = 'index.html';
        }, 500);
    }
});

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
`;
document.head.appendChild(style);

// Create confetti effect
function createConfetti() {
    const colors = ['#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c'];
    const confettiCount = 60;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                opacity: 1;
                animation: confetti ${2 + Math.random() * 3}s linear forwards;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30); // Stagger the confetti
    }
}

// Animate step numbers to show checkmarks
function animateStepCompletion() {
    const steps = [
        { element: step1, number: stepNumber1 },
        { element: step2, number: stepNumber2 },
        { element: step3, number: stepNumber3 }
    ];
    const delays = [300, 500, 700];
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.number.innerHTML = '✓';
            step.number.style.fontSize = '24px';
            step.number.style.fontWeight = 'bold';
            
            // Add bounce animation
            step.element.style.animation = 'bounce 0.5s ease';
        }, delays[index]);
    });
}

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(bounceStyle);

// Add hover effect to success icon
successIconWrapper.addEventListener('mouseenter', function() {
    successIcon.style.transform = 'scale(1.15) rotate(10deg)';
    successIcon.style.transition = 'transform 0.3s ease';
});

successIconWrapper.addEventListener('mouseleave', function() {
    successIcon.style.transform = 'scale(1) rotate(0deg)';
});

// Add keyboard support for login button
loginBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
    }
});

// Add pulse animation to login button
setInterval(() => {
    loginBtn.style.animation = 'pulse 1s ease';
    setTimeout(() => {
        loginBtn.style.animation = '';
    }, 1000);
}, 5000);

const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(pulseStyle);

// Smooth scroll to top on load
window.scrollTo({ top: 0, behavior: 'smooth' });

// Optional: Show a toast message
setTimeout(() => {
    showToast('Your account has been created successfully!');
}, 1500);

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #27ae60;
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-size: 15px;
        font-weight: 600;
        box-shadow: 0 5px 20px rgba(39, 174, 96, 0.4);
        z-index: 10001;
        animation: slideUpToast 0.5s ease-out;
    `;
    document.body.appendChild(toast);
    
    const toastAnim = document.createElement('style');
    toastAnim.textContent = `
        @keyframes slideUpToast {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(toastAnim);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}