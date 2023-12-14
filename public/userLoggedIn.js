// Find Sign in / Out - Create cafe
const signInNav = document.querySelector("#sign-in-link");
const signUpNav = document.querySelector("#sign-up-link");

const signOutNav = document.querySelector("#sign-out-link");

const createCafeNav = document.querySelector("#create-cafe-ink")

// FIND WHICH VERSION OF NAVBAR WE ARE ON
const navbarVersion = document.querySelector("nav")

// STORED USERID
let currentUserId = localStorage.getItem("userId");
let userLoggedIn = localStorage.getItem("userLoggedIn")


function updateNavbar () {
    signUpNav.classList.toggle("hidden")
    signInNav.classList.toggle("hidden")

    signOutNav.classList.toggle("hidden")
    createCafeNav.classList.toggle("hidden")
}

//Check the version of navbar
if (!(navbarVersion.classList.contains("loggedIn")) && userLoggedIn) {
    updateNavbar()
}

signOutNav.addEventListener("click",() => {
    navbarVersion.classList.toggle("loggedIn")
    updateNavbar()
    localStorage.clear("userId");
    localStorage.clear("loggedIn");
    // Send the user back to home page
    window.location.pathname  = "/Portefolje-6/public/index.html";
})
