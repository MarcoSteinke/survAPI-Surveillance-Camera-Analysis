class Detection {

    constructor(id) {
        this.id = id;
        this.date = Date.now();
        this.dateObject = new Date();
    }

    getId() {
        return this.id;
    }

    getDate() {
        return this.date;
    }

    getDateAsObject() {
        return this.dateObject;
    }
}