const FREE_PLACE = 0;
const GROWING_TREE = 1;
const GROWEN_TREE = 2
class Field {
    trees = [
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE,
        FREE_PLACE
    ]

    selectedTree = 0

    constructor(element) {
        this.element = element
    }

    setNextTree() {
        if (++this.selectedTree >= TREES.length) this.selectedTree = 0
    }

    setPrevTree() {
        if (--this.selectedTree < 0) this.selectedTree = TREES.length - 1
    }

    hasFreePlace() {
        for (let i = 0; i < this.trees.length; i++) {
            if (this.trees[i] == 0) {
                return true
            }
        }
        return false
    }

    plantSeed() {
        let inds = []
        this.trees.forEach((element, index) => {
            if (element == 0) {
                inds.push(index)
            }
        })
        if (inds.length == 0) {
            return -1
        }
        let seedPlace = inds[Math.floor(Math.random() * inds.length)]
        this.trees[seedPlace] = GROWING_TREE
        let place = this.element.querySelector(`#place${seedPlace}`)
        place.className = ''
        place.classList.add(GROWING_TREE_SELECTOR)
        place.classList.add(TREE_SELECTOR)
        place.classList.add(this.getTree())
        return seedPlace
    }

    getTree() {
        return TREES[this.selectedTree]
    }

    setGrowenTree(index) {
        if (index < 0) return
        this.trees[index] = GROWEN_TREE
        let place = this.element.querySelector(`#place${index}`)
        place.classList.remove(GROWING_TREE_SELECTOR)
    }

    deleteSeed() {
        for (let i = 0; i < this.trees.length; i++) {
            if (this.trees[i] == GROWING_TREE) {
                this.trees[i] = FREE_PLACE
                let place = this.element.querySelector(`#place${i}`)
                place.className = ''
                place.classList.add(EMPTY_PLACE_SELECTOR)
                return
            }
        }
    }
}