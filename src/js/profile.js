import { UserAuth } from "./firebase.js"

// globals
const userAuth = new UserAuth()



//buttons inputs
const logoutButton = document.querySelector("#logout-btn")
const emailLbl = document.querySelector("#email-label")
const usernameLbl = document.querySelector("#username-label")
const openSidebarButton = document.querySelector('#open-sidebar')
const closeSidebarButton = document.querySelector('#closebtn')

// functions
const setUpUser = (name, email) => {
    emailLbl.innerHTML = email
    usernameLbl.innerHTML = name
}

const logOut = (e) => {
    userAuth.logOutUser()
    window.location = "auth.html"
}

//listeners
openSidebarButton.addEventListener('click', openOverlay)
closeSidebarButton.addEventListener('click', closeOverlay)
logoutButton.addEventListener('click', logOut)

//on load
if (userAuth.getUser()) {
    let user = userAuth.getUser()
    logUser(user.displayName)
    setUpUser(user.displayName, user.email)
} else {
    unlogUser()
    window.location = "auth.html"
}