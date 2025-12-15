document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    let currentStep = 1;

    // Get all form steps and step indicator elements
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const stepLines = document.querySelectorAll('.step-line');

    // Function to update the step visuals
    function updateSteps() {
        // 1. Update Form Visibility
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(`step-${currentStep}`).classList.add('active');

        // 2. Update Indicator Styles (Circles & Labels)
        stepIndicators.forEach((indicator, index) => {
            if (index + 1 === currentStep) {
                indicator.classList.add('active');
            } else if (index + 1 < currentStep) {
                indicator.classList.add('active'); // Keep previous steps active/filled
            } else {
                indicator.classList.remove('active');
            }
        });

        // 3. Update Progress Line
        stepLines.forEach((line, index) => {
            const progress = (index < currentStep - 1) ? '100%' : '0%';
            // Use CSS variables or set a pseudo-element width via an attribute/class if needed
            // For simplicity, we'll set a class that updates the line
            if (index < currentStep - 1) {
                line.style.setProperty('--line-progress', '100%');
            } else {
                line.style.setProperty('--line-progress', '0%');
            }
        });

        // A quick fix to get the progress line filling (needs corresponding CSS)
        // Add this to your `style.css` for `step-line::before`:
        /*
        .step-line::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: #4a90e2;
            transition: width 0.3s;
            width: var(--line-progress, 0%);
        }
        */
        
    }

    // Function for basic validation for the current step
    function validateStep(stepId) {
        let isValid = true;
        const currentInputs = document.querySelectorAll(`#step-${stepId} input[required], #step-${stepId} select[required]`);
        
        currentInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#ccc';
            }
        });

        return isValid;
    }

    // Event listeners for all 'Next' buttons
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentStepId = e.target.closest('.form-step').id.split('-')[1];
            
            // Validate before moving next
            if (validateStep(currentStepId)) {
                const nextStep = parseInt(e.target.dataset.nextStep);
                if (nextStep) {
                    currentStep = nextStep;
                    updateSteps();
                }
            } else {
                alert('Please fill in all required fields to proceed.');
            }
        });
    });

    // Event listeners for all 'Back' buttons
    document.querySelectorAll('.btn-back').forEach(button => {
        button.addEventListener('click', (e) => {
            // Check if it's the "Back to Login" button (which doesn't have data-prev-step)
            if (e.target.dataset.prevStep) {
                const prevStep = parseInt(e.target.dataset.prevStep);
                if (prevStep) {
                    currentStep = prevStep;
                    updateSteps();
                }
            }
            // "Back to Login" is handled via the HTML onclick for simplicity
        });
    });

    // Initial load
    updateSteps();

    // Handle final form submission (e.g., to send data to a server)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registration Complete! (Form submitted)');
        // In a real application, you would collect and send the data here.
    });

});
