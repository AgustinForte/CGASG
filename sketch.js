let mic;

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(255, 20);
  FileList(0);
  ellipse(50,50,50,50);
}