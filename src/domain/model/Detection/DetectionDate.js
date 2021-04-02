class DetectionDate extends Date {

    constructor(day,month,year) {
        super();
        if(day == null || month == null || year == null) {
            this.value = [this.getDate(), this.getMonth()+1, this.getFullYear()].join('.');
        } else {
            this.value = [day, month, year].join('.');
        }
    }

    equals(anotherDate) {
        return this.getValue() == anotherDate.getValue();
    }

    getValue() {
        return this.value;
    }

    getTime() {
        return this.toLocaleTimeString();
    }
}