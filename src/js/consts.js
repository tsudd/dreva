const PLANT_BUTTON_LABEL = "Plant!"
const STOP_BUTTON_LABEL = "Stop"

const TREES = ["oak", "klen"]
const GROWING_TREE_SELECTOR = "growing-tree"
const EMPTY_PLACE_SELECTOR = "empty"
const TREE_SELECTOR = "tree"
const HOVERED_TREE_SELECTOR = "hovered-tree"

const openOverlay = (e) => {
    console.log(Math.round(document.documentElement.clientWidth * 0.8).toString())
    document.getElementById("sidepan").style.width = Math.round(document.documentElement.clientWidth * 0.8).toString() + "px"
}

const closeOverlay = (e) => {
    document.getElementById("sidepan").style.width = 0
}

const logUser = (name) => {
    document.querySelectorAll('#profile').forEach(profile => {
        profile.innerHTML = `Hi, ${name}`
        profile.setAttribute("href", "profile.html")
    })
}

const unlogUser = () => {
    document.querySelectorAll('#profile').forEach(profile => {
        profile.innerHTML = "Log in/Register"
        profile.setAttribute("href", "auth.html")
    })
}