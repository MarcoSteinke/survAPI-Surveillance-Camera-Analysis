let img, detector;

function preload() {
    img = loadImage('catdog.jpg');
}

function setup() {
    createCanvas(1254 / 2, 835 / 2);
    image(img, 0, 0);
}