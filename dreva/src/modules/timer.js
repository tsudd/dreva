export class CustomTimer {
    timeLong = 25
    success = false

    constructor() {
        this.timerElement = document.querySelector('#timing')
    }

    setTimer(time) {
        this.timeLong = time
    }

    startTimer(tree, success) {
        let distance = this.timeLong * 60
        this.interval = setInterval(async () => {
            let minutes = Math.floor(distance / 60);
            let seconds = Math.floor(distance % 60);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.timerElement.innerHTML = (`${minutes}<span class="timer-seconds">${seconds}</span>`)
            if (--distance < 0) {
                this.success = true
                await success({
                    tree: tree,
                    time: parseInt(this.timeLong)
                })
                clearInterval(this.interval)
            }
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.interval)
    }
}