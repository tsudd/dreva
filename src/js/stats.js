import { onAuth, CloudStorage } from "./firebase.js"

// elements
const openSidebarButton = document.querySelector('#open-sidebar')
const closeSidebarButton = document.querySelector('#closebtn')
const todayTotalLabel = document.querySelector(".today")
const weekTotalLabel = document.querySelector(".week")
const monthTotalLabel = document.querySelector(".month")

// global objects
const storage = new CloudStorage()

// functions
const render = async (user) => {
    let todayTotal = 0
    let weekTotal = 0
    let monthTotal = 0
    let records = await storage.getMonthTrees(user)

    let day = new Date()
    day.setUTCHours(0, 0, 0, 0)
    let week = new Date()
    week.setDate(week.getDate() - 7)
    week.setUTCHours(0, 0, 0, 0)

    records.forEach(record => {
        if (record.time >= day) todayTotal += record.long
        if (record.time >= week) weekTotal += record.long
        monthTotal += record.long
    })
    todayTotalLabel.innerHTML = todayTotal.toString()
    weekTotalLabel.innerHTML = weekTotal.toString()
    monthTotalLabel.innerHTML = monthTotal.toString()
}

// listeners
openSidebarButton.addEventListener('click', openOverlay)
closeSidebarButton.addEventListener('click', closeOverlay)

// onload
onAuth(render)