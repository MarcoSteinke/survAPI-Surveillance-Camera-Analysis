let img;
let detector;
let objects = [];

function preload() {
    img = loadImage('https://images2.minutemediacdn.com/image/upload/c_crop,h_835,w_1254,x_1,y_0/v1554995050/shape/mentalfloss/516438-istock-637689912.jpg?itok=SkYIK_Ob');
    detector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
    document.querySelector("#state").className = "loaded";
    document.querySelector("#state").innerHTML = "Model loaded.";
}

function setup() {
    createCanvas(1254, 835);
    image(img, 0, 0);

    detector.detect(img, (error, result) => {
        objects = result;

        objects.forEach( object => {
            text(object.label, object.x, object.y - 10);

            stroke(0, 255, 0);
            line(object.x, object.y, object.x + object.width, object.y);
            line(object.x, object.y, object.x, object.y + object.height);
            line(object.x, object.y + object.height, object.x + object.width, object.y + object.height);
            line(object.x + object.width, object.y, object.x + object.width, object.y + object.height);

            stroke(0,0,0);
        });
    });

}
