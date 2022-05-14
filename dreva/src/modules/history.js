export class Record {
    constructor(long, time, place = -1, tree = 0, id = "") {
        this.long = long
        this.time = time
        this.place = place
        this.tree = tree
        this.id = id
    }
}

export class History {
    records = []
    total = 0

    constructor(list, total) {
        this.listElement = list
        this.totalElement = total
    }

    addHistory(long, tree = 0, place = -1) {
        let date = new Date()
        let outputDate = date.getHours() + ':'
            + date.getMinutes() + ' '
            + date.getDate() + '/'
            + String(date.getMonth() + 1) + '/'
            + date.getFullYear()
        let li = document.createElement('li')
        li.innerHTML = `<p class="history-record">Focused ` +
            `<span class="history-long">${long}</span> minutes.</p><p class="history-time">${outputDate}</p>`
        this.total += parseInt(long)
        this.updateTotal()
        this.listElement.appendChild(li)
        this.addRecord(long, date, tree, place)
        return li
    }

    updateTotal() {
        this.totalElement.innerHTML = this.total.toString()
    }

    addRecord(long, time, tree, place) {
        this.records.push(new Record(long, time, place, tree))
    }

    generateRecordElementsAndSave(records) {
        this.records = records
        let elements = []
        this.total = 0
        this.records.forEach(record => {
            let li = document.createElement('li')
            let outputDate = record.time.getHours() + ':'
                + record.time.getMinutes() + ' '
                + record.time.getDate() + '/'
                + String(record.time.getMonth() + 1) + '/'
                + record.time.getFullYear()
            li.innerHTML = `<p class="history-record">Focused ` +
                `<span class="history-long">${record.long}</span> minutes.</p><p class="history-time">${outputDate}</p>`
            this.listElement.appendChild(li)
            this.total += parseInt(record.long)
            elements.push(li)
        })
        this.updateTotal()
        return elements
    }

    getRecordByPlace(place) {
        for (let i = 0; i < this.records.length; i++) {
            if (this.records[i].place === place) {
                return this.records[i]
            }
        }
        return null
    }

    updateRecordPlace(record, place) {
        let replasableRecord = this.getRecordByPlace(place)
        if (replasableRecord === null) {
            record.place = place
        } else {
            let temp = record.place
            record.place = replasableRecord.place
            replasableRecord.place = temp
        }
    }
}