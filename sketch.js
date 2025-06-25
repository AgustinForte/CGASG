let pincelesBajo = [];
let pincelesMedio = [];
let pincelesAlto = [];

let colores = [];
let mic, amp;
let ultimoColor = null;

let AMP_MIN = 0.03;
let canvasPinceles;

let tiempoUltimoSonido = 0;
const TIEMPO_LIMITE_SIN_SONIDO = 3000; // segundos

function preload() {
  for (let i = 1; i <= 17; i++) {
    let img = loadImage(`imagenes/${i}.png`);

    if (i >= 1 && i <= 5) {
      pincelesBajo.push(img);
    } else if (i >= 6 && i <= 11) {
      pincelesMedio.push(img);
    } else if (i >= 12 && i <= 17) {
      pincelesAlto.push(img);
    }
  }
}

function setup() {
  createCanvas(400, 800);
  background(255);

  canvasPinceles = createGraphics(400, 800);
  canvasPinceles.clear();

  colores = [
    color(208, 87, 76),
    color(40, 97, 164),
    color(193, 174, 80),
    color(12, 105, 84),
    color(0),
  ];

  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();
  amp.setInput(mic);

  tiempoUltimoSonido = millis();
}

function draw() {
  let volumen = amp.getLevel();
  volumen = constrain(volumen, 0, 0.5);

  if (volumen > AMP_MIN) {
    tiempoUltimoSonido = millis();
  }

  let tiempoSinSonido = millis() - tiempoUltimoSonido;

  if (tiempoSinSonido > TIEMPO_LIMITE_SIN_SONIDO) {
    canvasPinceles.noStroke();
    canvasPinceles.fill(255, 255, 255, 2); 
    canvasPinceles.rect(0, 0, width, height);
  }
  if (tiempoSinSonido >= TIEMPO_LIMITE_SIN_SONIDO * 2) {
    canvasPinceles.background(255); 
  }

  if (volumen > AMP_MIN) {
    let escala = map(volumen, AMP_MIN, 0.3, 0.4, 2.0);
    let x = random(width);
    let y = random(height);

    let pincel;
    if (volumen < 0.1) {
      pincel = random(pincelesBajo);
    } else if (volumen < 0.2) {
      pincel = random(pincelesMedio);
    } else  {
      pincel = random(pincelesAlto);
    }

    let col = randomColoresBalanceados();

    canvasPinceles.tint(col);
    canvasPinceles.imageMode(CENTER);
    canvasPinceles.image(pincel, x, y, pincel.width * escala, pincel.height * escala);
    canvasPinceles.noTint();
  }

  image(canvasPinceles, 0, 0);
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
    col.setAlpha(230);
  }

  return col;
}
