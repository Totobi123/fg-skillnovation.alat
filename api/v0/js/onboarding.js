var root_path = window.location.origin+'/';

document.getElementById('jobSeekerForm').addEventListener('submit', function(e) {
    let baseURL = root_path+"register/api/v0/php/"

    e.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = new FormData(this);
    const onboardEndpoint = baseURL+"onboarding.php";

    //console.log(formData); exit();

    // Send form data to the server
    fetch(onboardEndpoint, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => {
        if (data.success) {
            // alert('Form submitted successfully!');
            // Handle success, e.g., display a message, redirect, etc.
            window.location.href = "continue-registration.php"; // Redirect to continue.html
        } else {
            // alert('Error: ' + data.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
                showCancelButton: false,
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    // Refresh the page
                    location.reload();
                }
            });
            // Handle errors, e.g., display error messages
        }
    })
    .catch(error => {
        // console.error('Error:', error);
        // alert('An error occurred while submitting the form.');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while submitting the form.',
            showCancelButton: false,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Refresh the page
                location.reload();
            }
        });
    });
});