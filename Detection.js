class Detection {

    constructor(id, objects) {
        this.id = id;
        this.objects = objects;
        this.date = DetectionDate.now();
        this.dateObject = new DetectionDate();
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

    // return true if the detection has a valid ID and actually detected an object.
    isValid() {
        return this.id != -1 && this.objects.length > 0;
    }
}