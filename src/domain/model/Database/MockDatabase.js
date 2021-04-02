class MockDatabase {

    constructor() {
        this.db = [];
        this.lastDetection = Date.now();
        this.intervalDuration = 10;
    }

    saveDetection(detection) {

        if(detection.getDate() / 1000 - this.lastDetection / 1000 < this.intervalDuration) {
            console.log("too short");
            return;
        }

        if(detection != null) {

            let alreadySaved = false;
            let interrupted = false;

            this.db.forEach(savedDetection => {

                alreadySaved = alreadySaved || savedDetection.getId() == detection.getId();

                if(alreadySaved) {

                    console.log("There was already a detection with ID " + detection.getId());
                    interrupted = true;
                }
            });

            if(!interrupted) {
                this.db.push(detection);
                this.lastDetection = Date.now();
            }

        }
    }

    getDetectionById(detectionId) {
        let detection;

        this.db.forEach(storedDetection => {

            if(storedDetection.getId() == detectionId) {
                detection = storedDetection;
            }
        });

        return (detection != null) ? detection : new Detection(-1, null);
    }

    getDetectionsByDate(date) {
        let results = [];

        this.db.forEach(detection => {
            if(detection.dateObject.equals(date)) {
                results.push(detection);
            }
        });

        return results;
    }
}

const DATABASE = new MockDatabase();