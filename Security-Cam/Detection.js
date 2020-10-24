class Detection {

    constructor(id, objects) {
        this.id = id;
        this.objects = objects;
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