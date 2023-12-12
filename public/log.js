const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("#login-button");
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

const usernameInputFieldLogin = document.querySelector("#username");
const passwordInputFieldLogin = document.querySelector("#password");

loginBtn.addEventListener("click",() => {
    let username = usernameInputFieldLogin.value
    let password = passwordInputFieldLogin.value


    // Check username and password
    let loginData = {
        "username": username,
        "password": password
    }
    fetch('http://localhost:3000/login/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    }).then(response => response.text())
        .then((currentUserId) => {
            localStorage.setItem("userId",currentUserId)
        })
})

