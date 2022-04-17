// body
const body = document.querySelector('body')

// containers
const field = document.querySelector('#field')
const historyRecords = document.querySelector('#history')
const timerLabel = document.querySelector('#timing')

// buttons, inputs
const openOverlayButton = document.querySelector('#open-overlay')
const timeSlider = document.querySelector('#timer-slider')
const nextTreeButton = document.querySelector('#next-tree-button')
const prevTreeButton = document.querySelector('#prev-tree-button')
const plantButton = document.querySelector('#plant-btn')

// global main objects
const timer = new CustomTimer(timerLabel);
let treeGrowingMode = false
let selectedTree = 0


// functions
handleTimerChange = (e) => {
    timer.setTimer(e.target.value)
    timerLabel.innerHTML = e.target.value
}

handlePlantTree = (e) => {
    toggleMode()
    if (treeGrowingMode) {
        timer.startTimer()
    } else {

    }
}

toggleMode = () => {
    treeGrowingMode = !treeGrowingMode
    if (treeGrowingMode) {
        timeSlider.disabled = true;
        nextTreeButton.disabled = true;
        prevTreeButton.disabled = true;
        plantButton.classList.add("plant-btn__stop")
        plantButton.innerHTML = STOP_BUTTON_LABEL
    } else {
        timeSlider.disabled = false;
        nextTreeButton.disabled = false;
        prevTreeButton.disabled = false;
        plantButton.classList.remove("plant-btn__stop")
        plantButton.innerHTML = PLANT_BUTTON_LABEL
        timer.stopTimer()
    }
}

treeHasGrowen = () => {

}

// listeners
timeSlider.addEventListener("input", handleTimerChange)
plantButton.addEventListener("click", handlePlantTree)