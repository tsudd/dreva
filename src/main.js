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
const forest = new Field(field)
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
        let growing = -1
        if (!forest.hasFreePlace()) {
            let ans = confirm("Forest is full. Continue without planting a new tree?")
            if (!ans) return
        } else {
            growing = forest.plantSeed()
        }
        timer.startTimer(growing)
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

treeHasGrowen = (e) => {
    forest.setGrowenTree(e.detail.tree)
    toggleMode()
}

// listeners
document.addEventListener("treeHasGrowen", treeHasGrowen)
timeSlider.addEventListener("input", handleTimerChange)
plantButton.addEventListener("click", handlePlantTree)