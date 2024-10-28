// js/login.js
const API_URL = "https://localhost:7171/api/Auth";

const btn_login = document.getElementById('btn_login');
const btn_create = document.getElementById('btn_create');
const errorMessage = document.getElementById('error-message');

function readInputs() {
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    return new URLSearchParams({
        userName: usernameInput.value,
        password: passwordInput.value
    });
}

async function handleLogin() {
    try {
        const urlParams = readInputs();
        const fullURL = `${API_URL}?${urlParams.toString()}`;

        const response = await fetch(fullURL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.ok) {
            // Store user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.userName));

            // Redirect to dashboard - using relative path
            window.location.href = 'test.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Login failed. Please try again.';
        errorMessage.style.display = 'block';
    }
}

btn_create.addEventListener('click', () => {
    window.location.href = 'registration.html';
});




// Check if user is already logged in
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'test.html';
    }
}

btn_login.addEventListener('click', handleLogin);
document.addEventListener('DOMContentLoaded', checkAuthStatus);

btn_create.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'registration.html';
});