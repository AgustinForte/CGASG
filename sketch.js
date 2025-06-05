let pinceles = [];
let nombresPinceles = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png"
];

let colores = [];
let mic, amp;
let ultimoColor = null;

const AMP_MIN = 0.05; 

function preload() {
  for (let nombre of nombresPinceles) {
    pinceles.push(loadImage(`imagenes/${nombre}`));
  }
}

function setup() {
  createCanvas(400,800);
  background(255);

  colores = [
    color(255, 0, 0),
    color(0, 0, 255),
    color(255, 255, 0),
    color(0, 255, 0),
    color(0),
  ];

  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();
  amp.setInput(mic);
}

function draw() {
  let volumen = amp.getLevel();
  volumen = constrain(volumen, 0, 0.3);


  if (volumen > AMP_MIN && frameCount % 15 === 0) {
    let escala = map(volumen, AMP_MIN, 0.3, 0.4, 2.0);

    let x = random(width);
    let y = random(height);

    let pincel = random(pinceles);
    let col = randomColoresBalanceados();

    tint(col);
    imageMode(CENTER);
    image(pincel, x, y, pincel.width * escala, pincel.height * escala);
    noTint();
  }
}

function randomColoresBalanceados() {
  let col;
  do {
    col = random(colores);
  } while (col === ultimoColor);
  ultimoColor = col;

  if (red(col) === 0 && green(col) === 0 && blue(col) === 0) {
    col.setAlpha(100); 
  } else {
    col.setAlpha(255); 
  }

  return col;
}
