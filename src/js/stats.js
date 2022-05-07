import { onAuth, UserAuth, CloudStorage } from "./firebase.js"

// elements
const openSidebarButton = document.querySelector('#open-sidebar')
const closeSidebarButton = document.querySelector('#closebtn')

// global objects
const userAuth = new UserAuth()
const storage = new CloudStorage()

// functions


// listeners
openSidebarButton.addEventListener('click', openOverlay)
closeSidebarButton.addEventListener('click', closeOverlay)

// onload
onAuth(async (user) => {

})