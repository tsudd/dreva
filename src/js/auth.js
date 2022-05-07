import { onAuth, UserAuth } from "./firebase.js"
//buttons inputs
const loginForm = document.querySelector(".login")
const registerForm = document.querySelector(".register")
const logInToggle = document.querySelector(".log-in-li")
const registerToggle = document.querySelector(".register-li")
const openSidebarButton = document.querySelector('#open-sidebar')
const closeSidebarButton = document.querySelector('#closebtn')

registerForm.style.display = "none"

// global objects
const userAuth = new UserAuth()


// functions
const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

//listeners
logInToggle.addEventListener("click", (e) => {
    e.target.classList.add("active")
    registerToggle.classList.remove("active")
    loginForm.style.display = "block"
    registerForm.style.display = "none"
})

registerToggle.addEventListener("click", (e) => {
    e.target.classList.add("active")
    logInToggle.classList.remove("active")
    loginForm.style.display = "none"
    registerForm.style.display = "block"
})

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = loginForm["email"].value
    if (!validateEmail(email)) {
        return false
    }
    let password = loginForm["password"].value
    if (password.length < 8) {
        alert("Password is too short!")
        return false
    }
    userAuth.logInUser({ email: email, password: password })
})

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = registerForm["email"].value
    if (!validateEmail(email)) {
        return false
    }
    let password = registerForm["password"].value
    if (password.length < 8) {
        alert("Password is too short!")
        return false
    }
    let username = registerForm["username"].value
    if (username.length > 30 || username.length == 0) {
        alert("Wrong username. Try again.")
        return false
    }
    userAuth.signUpUser({ email: email, password: password, username: username })
})

openSidebarButton.addEventListener('click', openOverlay)
closeSidebarButton.addEventListener('click', closeOverlay)

// onload
onAuth(async (user) => {
    window.location = "profile.html"
})