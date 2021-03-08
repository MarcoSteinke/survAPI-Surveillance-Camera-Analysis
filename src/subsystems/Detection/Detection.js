const DetectionDate = require('../Detection/DetectionDate.js');

module.exports = class Detection {

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

    toString() {
        let resultObjectsString = "";
        objects.forEach(object => resultObjectsString += [object.label, "confidence=" + object.confidence.toFixed(2)].join(', '));
        return `id=${this.id}, objects=${resultObjectsString}, date=${this.dateObject.getValue()}`;
    }

    getObjectLabels() {
        return objects.map(object => object.label).join(',');
    }

    getObjectConfidences() {
        return objects.map(object => object.confidence.toFixed(2)).join(',');
    }

    getDateAsObjectAsString() {
        return this.dateObject;
    }

    // return true if the detection has a valid ID and actually detected an object.
    isValid() {
        return this.id != -1 && this.objects.length > 0;
    }
}