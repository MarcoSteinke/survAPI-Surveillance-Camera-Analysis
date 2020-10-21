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

}