//buttons inputs

const logInButton = document.querySelector("#login-btn")
const registerButton = document.querySelector("#register-btn")
const loginForm = document.querySelector(".login")
const registerForm = document.querySelector(".register")
const logInToggle = document.querySelector(".log-in-li")
const registerToggle = document.querySelector(".register-li")
const openSidebarButton = document.querySelector('#open-sidebar')
const closeSidebarButton = document.querySelector('#closebtn')

registerForm.style.display = "none"


// functions
openOverlay = (e) => {
    document.getElementById("sidepan").style.width = Math.round(document.documentElement.clientWidth * 0.8).toString() + "px"
}

closeOverlay = (e) => {
    document.getElementById("sidepan").style.width = 0
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

logInButton.addEventListener("click", (e) => {
    console.log(228)
})

registerButton.addEventListener("click", (e) => {
    console.log(228)
})

openSidebarButton.addEventListener('click', openOverlay)
closeSidebarButton.addEventListener('click', closeOverlay)


