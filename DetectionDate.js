class DetectionDate extends Date {

    constructor() {
        super();
    }

    equals(anotherDate) {
        return this.toString() == anotherDate.toString();
    }

    toString() {
        return [this.getDate(), this.getMonth(), this.getFullYear()].join('.');
    }
}