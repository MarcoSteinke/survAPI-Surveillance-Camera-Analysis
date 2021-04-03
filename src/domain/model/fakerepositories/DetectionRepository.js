class DetectionRepository {

    constructor(database) {
        this.database = database;
    }

    findAllDetections() {
        return this.database.db;
    }

    save(detection) {
        this.database.saveDetection(detection);
    }
}