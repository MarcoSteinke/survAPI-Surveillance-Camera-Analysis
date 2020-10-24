class MockDatabase {

    constructor() {
        this.db = [];
        this.lastDetection = Date.now();
    }

    saveDetection(detection) {

        if(detection.getDate() / 1000 - this.lastDetection / 1000 < 10) {
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
}

const DATABASE = new MockDatabase();