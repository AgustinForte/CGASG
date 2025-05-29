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
  
}