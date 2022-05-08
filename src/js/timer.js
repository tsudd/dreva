class CustomTimer {
    timeLong = 25
    success = false

    constructor(label) {
        this.labelElement = label
    }

    setTimer(time) {
        this.timeLong = time
    }

    startTimer(tree) {
        let distance = this.timeLong * 60
        this.interval = setInterval(() => {
            let minutes = Math.floor(distance / 60);
            let seconds = Math.floor(distance % 60);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.labelElement.innerHTML = `${minutes}<span class="timer-seconds">${seconds}</span>`
            if (--distance < 0) {
                this.success = true
                this.labelElement.innerHTML = this.timeLong
                let e = new CustomEvent("treeHasGrowen", {
                    detail: {
                        tree: tree,
                        time: this.timeLong,
                    }
                })
                document.dispatchEvent(e)
                clearInterval(this.interval)
            }
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.interval)
        this.labelElement.innerHTML = this.timeLong
    }
}