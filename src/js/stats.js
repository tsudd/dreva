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
    renderMonthChart(records)

    todayTotalLabel.innerHTML = todayTotal.toString()
    weekTotalLabel.innerHTML = weekTotal.toString()
    monthTotalLabel.innerHTML = monthTotal.toString()
}

const renderMonthChart = (records) => {
    let minutesPerDay = []
    let dates = []

    for (let i = 0, date = new Date(); i < 30; i++, date.setDate(date.getDate() - 1)) {
        minutesPerDay.push(0)
        dates.push((date.getDate() < 10 ? '0' : '') + date.getDate() + '/' + (date.getMonth() + 1).toString())
    }
    dates = dates.reverse()

    let day = new Date()
    day.setUTCHours(0, 0, 0, 0)
    for (let i = records.length - 1, j = dates.length - 1; i >= 0 && j >= 0; i--) {
        if (records[i].time >= day) {
            minutesPerDay[j] += records[i].long
        } else {
            day.setDate(day.getDate() - 1)
            j--
        }
    }

    const data = {
        labels: dates,
        datasets: [{
            label: 'Minutes per day',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: minutesPerDay
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {}
    }

    const treePerDayChart = new Chart(
        document.getElementById("monthStat"),
        config
    )
}

const unlogedUser = () => {
    document.querySelector(".totals").innerHTML = "Log in to see your stats"
}

// listeners
openSidebarButton.addEventListener('click', openOverlay)
closeSidebarButton.addEventListener('click', closeOverlay)

// onload
onAuth(render, unlogedUser)