/* * * * * * * * * * * * * * * * * **/
/* required variables DO NOT CHANGE */
let video;
let detector;
let objects = [];

/* * * * * * * * * * * * * * * * * **/

/* user oriented variables CHANGE   */
// fill targets with labels to detect and store them
// or leave it empty to detect and store everything.
let targets = [];
DATABASE.intervalDuration = 10;

/* * * * * * * * * * * * * * * * * **/

// prepare the setup of camera and ml5 Object Detection
function preload() {
    video = createCapture(VIDEO);
    video.hide();
    detector = ml5.objectDetector('cocossd', modelLoaded);
}

// a simple method to calculate the time between two timestamps
function timeBetweenInSeconds(date, anotherDate) {
    return Math.abs(date / 1000 - anotherDate / 1000);
}

// update the header if the model is loaded
function modelLoaded() {
    document.querySelector("#state").className = "loaded";
    document.querySelector("#state").innerHTML = "Model loaded.";
}

// setup the canvas and display the video
function setup() {
    createCanvas(1254, 835);
    image(video, 0, 0);

}

function collectObjectsByTargets(objectCollection) {

    let result = [];

    objects.forEach( object => {

        // if the object is included in targets store it
        targets.forEach(target => {

            if(object.label == target) {
                result.push(object);
            }
        });
    });

    return result;
}

// try to detect any objects in the canvas
function detect() {

    // ml5 detect method returns error and result object
    detector.detect(video, (error, result) => {
        objects = result;
    });

    // if 10 seconds have passed and there are any objects, store them.
    if(timeBetweenInSeconds(Date.now(), DATABASE.lastDetection) > DATABASE.intervalDuration) {

        if(targets.length > 0) {

            DATABASE.saveDetection(new Detection(
                DATABASE.db.length + 1, 
                collectObjectsByTargets(objects)
            ));
            
        } else {
            DATABASE.saveDetection(new Detection(
                DATABASE.db.length + 1,
                objects
            ));
        }
        
    }
}

function isTarget(label) {

    return targets.filter(target => target == label).length > 0;
}

// method to label and mark all detections
function label() {
    if(objects && objects.length > 0) {
        objects.forEach( object => {

            // if the object is from type "TARGET" mark and label it
            if(isTarget(object.label) && targets.length > 0) {
                text(object.label, object.x, object.y - 10);
    
                stroke(0, 255, 0);
                line(object.x, object.y, object.x + object.width, object.y);
                line(object.x, object.y, object.x, object.y + object.height);
                line(object.x, object.y + object.height, object.x + object.width, object.y + object.height);
                line(object.x + object.width, object.y, object.x + object.width, object.y + object.height);
        
                stroke(0,0,0);
            } else if(targets.length == 0) {
                text(object.label, object.x, object.y - 10);
    
                stroke(0, 255, 0);
                line(object.x, object.y, object.x + object.width, object.y);
                line(object.x, object.y, object.x, object.y + object.height);
                line(object.x, object.y + object.height, object.x + object.width, object.y + object.height);
                line(object.x + object.width, object.y, object.x + object.width, object.y + object.height);
        
                stroke(0,0,0);
            }

        });
    }
}


// draw function will execute each tick
function draw() {

    clear();

    image(video, 0, 0);

    detect();
    label();
    
}
