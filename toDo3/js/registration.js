const registrationForm = document.getElementById('registrationForm');
        const errorMessage = document.getElementById('error-message');

        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form submission for demonstration

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;

            // Basic validation example
            if (username && password && email) {
                




                // Here, you can implement the logic to send this data to the server
                console.log('Registration Data:', { username, password, email });
                errorMessage.style.display = 'none';
                
                window.location.href = 'test.html';
                
            } else {
                errorMessage.textContent = 'Please fill in all fields correctly.';
                errorMessage.style.display = 'block';
            }
        });