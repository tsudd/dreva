import { UserAuth, CloudStorage, onAuth } from "./js/firebase.js"

// containers
const field = document.querySelector('#field')
const timerLabel = document.querySelector('#timing')
const boxes = document.querySelectorAll('.box')

// buttons, inputs
const timeSlider = document.querySelector('#timer-slider')
const nextTreeButton = document.querySelector('#next-tree-button')
const prevTreeButton = document.querySelector('#prev-tree-button')
const plantButton = document.querySelector('#plant-btn')
const selectedTreeLabel = document.querySelector('#selected-tree')
const totalTimeLabel = document.querySelector('#total-time')
const historySection = document.querySelector('#history')
const openSidebarButton = document.querySelector('#open-sidebar')
const closeSidebarButton = document.querySelector('#closebtn')

// global main objects
const timer = new CustomTimer(timerLabel);
const forest = new Field(field)
const history = new History(historySection, totalTimeLabel)
const userAuth = new UserAuth()
const storage = new CloudStorage()
let treeGrowingMode = false


// functions
const dragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
    e.dataTransfer.setData('text/html', e.target.outerHTML)
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

const dragEnd = (e) => {
    e.target.classList.remove('hide')
}

const dragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

const dragOver = (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

const dragLeave = (e) => {
    e.target.classList.remove('drag-over');
}

const drop = async (e, el) => {
    e.preventDefault()
    e.target.classList.remove('drag-over')
    const id = e.dataTransfer.getData('text/plain')
    const draggable = document.getElementById(id)
    const initialPlace = draggable.parentNode
    const targetChild = el.firstElementChild
    el.innerHTML = ''
    el.appendChild(draggable)
    initialPlace.appendChild(targetChild)
    if (userAuth.getUser() !== null) {
        let newPlace = Array.prototype.indexOf.call(document.getElementById("field").children, el)
        let draggedRecord = history.getRecordByPlace(Array.prototype.indexOf.call(document.getElementById("field").children, initialPlace))
        if (draggedRecord === null) return
        await storage.updateTreePlace(userAuth.getUser(), draggedRecord, newPlace)
        history.updateRecordPlace(draggedRecord, newPlace)
    }
}

const handleTimerChange = (e) => {
    timer.setTimer(e.target.value)
    timerLabel.innerHTML = e.target.value
}

const handlePlantTree = (e) => {
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

const toggleMode = () => {
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

const treeHasGrowen = async (ee) => {
    let tree = forest.setGrowenTree(ee.detail.tree)
    let record = history.addHistory(ee.detail.time, forest.selectedTree, ee.detail.tree)

    tree.addEventListener('dragstart', dragStart)
    tree.addEventListener('dragend', dragEnd)
    if (ee.detail.tree > 0) {
        record.addEventListener('mouseover', (e) => handleRecordPoint(tree))
        record.addEventListener('mouseleave', (e) => handleRecordLeave(tree))
    }
    if (userAuth.getUser() !== null) {
        let treeId = await storage.postTree(userAuth.getUser(), history.records[history.records.length - 1])
        history.records[history.records.length - 1].id = treeId
    }
    toggleMode()
    alert("Tree has growen!")
}

const handleRecordPoint = (tree) => {
    tree.classList.add(HOVERED_TREE_SELECTOR)
}

const handleRecordLeave = (tree) => {
    tree.classList.remove(HOVERED_TREE_SELECTOR)
}

const selectNextTree = (e) => {
    selectedTreeLabel.classList.remove(forest.getTree())
    forest.setNextTree()
    selectedTreeLabel.classList.add(forest.getTree())
}

const selectPrevTree = (e) => {
    selectedTreeLabel.classList.remove(forest.getTree())
    forest.setPrevTree()
    selectedTreeLabel.classList.add(forest.getTree())
}

const getTodayTrees = async (user) => {
    let todayRecords = await storage.getTodayTrees(user)
    let recordElements = history.generateRecordElementsAndSave(todayRecords)
    for (let i = 0; i < todayRecords.length; i++) {
        let tree = forest.plantTree(todayRecords[i].place, todayRecords[i].tree)
        tree.addEventListener('dragstart', dragStart)
        tree.addEventListener('dragend', dragEnd)

        recordElements[i].addEventListener('mouseover', (e) => handleRecordPoint(tree))
        recordElements[i].addEventListener('mouseleave', (e) => handleRecordLeave(tree))
    }
}

// listeners
nextTreeButton.addEventListener("click", selectNextTree)
prevTreeButton.addEventListener("click", selectPrevTree)
document.addEventListener("treeHasGrowen", treeHasGrowen)
timeSlider.addEventListener("input", handleTimerChange)
plantButton.addEventListener("click", handlePlantTree)
boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', async (e) => await drop(e, box))
})
openSidebarButton.addEventListener('click', openOverlay)
closeSidebarButton.addEventListener('click', closeOverlay)
await onAuth(async (user) => { await getTodayTrees(user) })

//ONLY FOR TEST PURPOSES
window.onkeydown = (gfg) => {
    if (gfg.keyCode === 32) {
        if (!treeGrowingMode) {
            return
        }
        console.log("nice")
        let g = -1
        forest.trees.forEach((tree, ind) => {
            if (tree == GROWING_TREE) {
                g = ind
            }
        })
        let e = new CustomEvent("treeHasGrowen", {
            detail: {
                tree: g,
                time: timer.timeLong,
            }
        })
        document.dispatchEvent(e)
        timer.stopTimer()
    }
}