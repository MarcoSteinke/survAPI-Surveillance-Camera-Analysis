let video;
let detector;
let objects = [];

function preload() {
    video = createCapture(VIDEO);
    video.hide();
    detector = ml5.objectDetector('cocossd', modelLoaded);
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
}

function draw() {

    clear();

    detect();

    console.log(objects);

    if(objects && objects.length > 0) {
        objects.forEach( object => {
            text(object.label, object.x, object.y - 10);
    
            stroke(0, 255, 0);
            line(object.x, object.y, object.x + object.width, object.y);
            line(object.x, object.y, object.x, object.y + object.height);
            line(object.x, object.y + object.height, object.x + object.width, object.y + object.height);
            line(object.x + object.width, object.y, object.x + object.width, object.y + object.height);
    
            stroke(0,0,0);
        });
    }
    
}