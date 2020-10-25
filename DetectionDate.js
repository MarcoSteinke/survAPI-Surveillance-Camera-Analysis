class DetectionDate extends Date {

    constructor() {
        super();
    }

    equals(anotherDate) {
        return this.getValue() == anotherDate.getValue();
    }

    getValue() {
        return [this.getDate(), this.getMonth(), this.getFullYear()].join('.');
    }
}