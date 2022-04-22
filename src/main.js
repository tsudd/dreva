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
const selectedTreeLabel = document.querySelector('#selected-tree')
const totalTimeLabel = document.querySelector('#total-time')
const historySection = document.querySelector('#history')

// global main objects
const timer = new CustomTimer(timerLabel);
const forest = new Field(field)
const history = new History(historySection, totalTimeLabel)
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
        forest.deleteSeed()
    }
}

treeHasGrowen = (e) => {
    forest.setGrowenTree(e.detail.tree)
    history.addHistory(e.detail.time)
    toggleMode()
}

selectNextTree = (e) => {
    selectedTreeLabel.classList.remove(forest.getTree())
    forest.setNextTree()
    selectedTreeLabel.classList.add(forest.getTree())
}

selectPrevTree = (e) => {
    selectedTreeLabel.classList.remove(forest.getTree())
    forest.setPrevTree()
    selectedTreeLabel.classList.add(forest.getTree())
}

// listeners
nextTreeButton.addEventListener("click", selectNextTree)
prevTreeButton.addEventListener("click", selectPrevTree)
document.addEventListener("treeHasGrowen", treeHasGrowen)
timeSlider.addEventListener("input", handleTimerChange)
plantButton.addEventListener("click", handlePlantTree)


//ONLY FOR TEST PURPOSES
window.onkeydown = (gfg) => {
    if (gfg.keyCode === 32) {
        if (!treeGrowingMode) {
            return
        }
        forest.setGrowenTree(forest.selectedTree)
        history.addHistory(timer.timeLong)
        toggleMode()
    }
}