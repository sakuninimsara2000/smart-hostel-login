document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    let currentStep = 1;

    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const stepLines = document.querySelectorAll('.step-line');

    // Function to capture input data and update the final step's display
    function updateConfirmationStep() {
        // --- Step 1 Data ---
        const fullName = document.getElementById('fullName').value;
        const uniId = document.getElementById('uniId').value;
        const facultySelect = document.getElementById('faculty');
        const facultyText = facultySelect.options[facultySelect.selectedIndex].text;

        // --- Step 2 Data ---
        const hostelSelect = document.getElementById('hostelName');
        const hostelText = hostelSelect.options[hostelSelect.selectedIndex].text;
        const activatedDate = document.getElementById('activatedDate').value;
        
        // Use a default value if the user didn't select/enter anything
        const defaultText = '- Not Provided -';

        // --- Update Step 3 Display ---
        document.getElementById('displayName').textContent = fullName || defaultText;
        document.getElementById('displayUniId').textContent = uniId || defaultText;
        // Check if a faculty was actually selected, otherwise show 'Not Provided'
        document.getElementById('displayFaculty').textContent = (facultySelect.value) ? facultyText : defaultText;
        
        // For Hostel and Date
        document.getElementById('displayHostel').textContent = (hostelSelect.value) ? hostelText : defaultText;
        // The date field in the alert box is also updated dynamically
        document.getElementById('displayActivatedDate').textContent = activatedDate || '2025-11-27'; 
    }

    // Function to update the step visuals
    function updateSteps() {
        // 1. Update Form Visibility
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        const targetStepElement = document.getElementById(`step-${currentStep}`);
        if (targetStepElement) {
             targetStepElement.classList.add('active');
        }

        // 2. Update Indicator Styles (Circles & Labels)
        stepIndicators.forEach((indicator, index) => {
            if (index + 1 === currentStep) {
                indicator.classList.add('active');
            } else if (index + 1 < currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // 3. Update Progress Line
        stepLines.forEach((line, index) => {
            const progress = (index < currentStep - 1) ? '100%' : '0%';
            line.style.setProperty('--line-progress', progress);
        });

        // This part ensures Step 3 is fully filled when on step 3
        if (currentStep === 3) {
            stepIndicators[2].classList.add('active');
            if (stepLines[1]) {
                stepLines[1].style.setProperty('--line-progress', '100%');
            }
        }
    }

    // Function for basic validation for the current step
    function validateStep(stepId) {
        if (stepId === '3') return true; 

        let isValid = true;
        const currentInputs = document.querySelectorAll(`#step-${stepId} input[required], #step-${stepId} select[required]`);
        
        currentInputs.forEach(input => {
            // Check if the input is empty or the select box has the default option selected
            if (input.tagName === 'SELECT' && input.value === '') {
                 input.style.borderColor = 'red';
                 isValid = false;
            } else if (!input.value.trim()) {
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
            
            if (validateStep(currentStepId)) {
                const nextStep = parseInt(e.target.dataset.nextStep);
                if (nextStep) {
                    currentStep = nextStep;
                    updateSteps();

                    // IMPORTANT: If moving to the final step (3), update the display data
                    if (currentStep === 3) {
                        updateConfirmationStep();
                    }
                }
            } else {
                alert('Please fill in all required fields to proceed.');
            }
        });
    });

    // Event listeners for all 'Back' buttons
    document.querySelectorAll('.btn-back').forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.dataset.prevStep) {
                const prevStep = parseInt(e.target.dataset.prevStep);
                if (prevStep) {
                    currentStep = prevStep;
                    updateSteps();
                }
            }
        });
    });

    // Initial load
    updateSteps();
});