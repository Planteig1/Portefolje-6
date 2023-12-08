const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = (()=>{
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
    signupBtn.click();
    return false;
});

// log.js

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login form');
    const signupForm = document.querySelector('.signup form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.querySelector('.login input[type="text"]').value;
        const password = document.querySelector('.login input[type="password"]').value;

        // Make a fetch request to your server for login
        fetch('http://your-server-endpoint/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Handle the response from the server as needed
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const firstName = document.querySelector('.signup input[placeholder="Firstname"]').value;
        const lastName = document.querySelector('.signup input[placeholder="Lastname"]').value;
        const email = document.querySelector('.signup input[placeholder="Email Address"]').value;
        const password = document.querySelector('.signup input[placeholder="Password"]').value;
        const confirmPassword = document.querySelector('.signup input[placeholder="Confirm password"]').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Make a fetch request to your server for signup
        fetch('/create/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Handle the response from the server as needed
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
});
