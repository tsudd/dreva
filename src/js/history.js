class Record {
    constructor(long, time, place = -1) {
        this.long = long
        this.time = time
        this.place = place
    }
}

class History {
    records = []
    total = 0

    constructor(list, total) {
        this.listElement = list
        this.totalElement = total
    }

    addHistory(long) {
        let date = new Date()
        let outputDate = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '/' + String(date.getMonth() + 1) + '/' + date.getFullYear()
        let li = document.createElement('li')
        li.innerHTML = `<p id="rec${this.records.length + 1}" class="history-record">Focused ` +
            `<span class="history-long">${long}</span> minutes.</p><p class="history-time">${outputDate}</p>`
        this.total += parseInt(long)
        this.totalElement.innerHTML = this.total.toString()
        this.listElement.appendChild(li)
        this.addRecord(long, date)
    }

    addRecord(long, time) {
        this.records.push(new Record(long, time))
    }
}