
// Login
const usernameInputFieldLogin = document.querySelector("#username-login");
const passwordInputFieldLogin = document.querySelector("#password-login");

const loginButton = document.querySelector("#login-button");

// Register
const usernameInputFieldRegister = document.querySelector("#username-register");
const passwordInputFieldRegister = document.querySelector("#password-register");
const emailInputFieldRegister = document.querySelector("#email-register");
const firstNameInputFieldRegister = document.querySelector("#first-name-register");
const lastNameInputFieldRegister = document.querySelector("#last-name-register");

const registerButton = document.querySelector("#register-button");





loginButton.addEventListener("click",() => {
    // Get the data
    const username = usernameInputFieldLogin.value
    const password = passwordInputFieldLogin.value

    //Check to see if theres a value in the fields
    let arrayOfData = [username,password]
    if(!arrayOfData.every(dataPoint => dataPoint.length > 0)) {
        alert("Please provide a value for each field!")
        return;
    }
    // Check username and password
    let loginData = {
        "username": username,
        "password": password
    }

    // Get the response
    fetch('http://localhost:3000/login/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    }).then(response => response.text())
        .then((currentUserId) => {
            // If username or password is wrong
            if (!currentUserId) {
                alert("Wrong Username or Password")
                return;
            }

            // Username and password matches
            succesfullLoginOrRegister(currentUserId)
        })
})

registerButton.addEventListener("click",() => {
    // Get the data
    const username = usernameInputFieldRegister.value
    const password = passwordInputFieldRegister.value
    const email = emailInputFieldRegister.value
    const firstName = firstNameInputFieldRegister.value
    const lastName = lastNameInputFieldRegister.value

    //Check to see if theres a value in the fields
    let arrayOfData = [username,password,email,firstName,lastName];
    if(!arrayOfData.every(dataPoint => dataPoint.length > 0)) {
        alert("Please provide a value for each field!")
        return;
    }
    let regexForEmail = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/;

    if(!(regexForEmail.test(email))) {
        alert("Please provide a real email address")
        return;
    }


    let registerData = {
        "username": username,
        "email": email,
        "password": password,
        "first_name": firstName,
        "last_name": lastName
    }

    // Get the response
    fetch('http://localhost:3000/create/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    }).then(response => response.text())
        .then((currentUserId) => {
            console.log(currentUserId);
            // If username or password is wrong
            if (!currentUserId) {
                alert("Username or email is already in use!")
                return;
            }
            // The creation was a success, send the user to the front page - logged in.
            succesfullLoginOrRegister(currentUserId)
        })

})

function succesfullLoginOrRegister (currentUserId) {
    localStorage.setItem("userId",currentUserId);
    localStorage.setItem("userLoggedIn", true);
    updateNavbar();
    //Change the page to landing page
    navbarVersion.classList.toggle("loggedIn");
    window.location.pathname  = "/Portefolje-6/public/index.html";
}