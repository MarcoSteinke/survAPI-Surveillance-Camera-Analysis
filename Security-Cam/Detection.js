class Detection {

    constructor(id) {
        this.id = id;
        this.date = Date.now();
    }

    getId() {
        return this.id;
    }

    getDate() {
        return this.date;
    }
}