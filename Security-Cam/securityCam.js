let video;
let detector;
let objects = [];

const TARGET = "person";

function preload() {
    video = createCapture(VIDEO);
    video.hide();
    detector = ml5.objectDetector('cocossd', modelLoaded);
}

function timeBetweenInSeconds(date, anotherDate) {
    return Math.abs(date / 1000 - anotherDate / 1000);
}

function modelLoaded() {
    document.querySelector("#state").className = "loaded";
    document.querySelector("#state").innerHTML = "Model loaded.";
}

function setup() {
    createCanvas(1254, 835);
    image(video, 0, 0);

}

function detect() {
    detector.detect(video, (error, result) => {
        objects = result;
    });

    if(timeBetweenInSeconds(Date.now(), DATABASE.lastDetection) > 10) {
        DATABASE.saveDetection(new Detection(DATABASE.db.length + 1, objects));
    }
}

function label() {
    if(objects && objects.length > 0) {
        objects.forEach( object => {

            if(object.label == TARGET) {
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

function draw() {

    clear();

    image(video, 0, 0);

    detect();
    label();
    
}