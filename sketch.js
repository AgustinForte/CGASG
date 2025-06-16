let pincelesBajo = [];
let pincelesMedio = [];
let pincelesAlto = [];

let colores = [];
let mic, amp;
let ultimoColor = null;

let AMP_MIN = 0.03;
let canvasPinceles;

let tiempoUltimoSonido = 0;
const TIEMPO_LIMITE_SIN_SONIDO = 5000; // 5 segundos

function preload() {
  pincelesBajo.push(loadImage("imagenes/1.png"));
  pincelesBajo.push(loadImage("imagenes/2.png"));

  pincelesMedio.push(loadImage("imagenes/3.png"));
  pincelesMedio.push(loadImage("imagenes/4.png"));

  pincelesAlto.push(loadImage("imagenes/5.png"));
  pincelesAlto.push(loadImage("imagenes/6.png"));
}

function setup() {
  createCanvas(400, 800);
  background(255);

  canvasPinceles = createGraphics(400, 800);
  canvasPinceles.clear();

  colores = [
    color(255, 0, 0),
    color(0, 0, 255),
    color(255, 255, 0),
    color(0, 255, 0),
    color(0), // negro
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
  volumen = constrain(volumen, 0, 0.3);

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
    } else if (volumen < 0.3) {
      pincel = random(pincelesMedio);
    } else {
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
    col.setAlpha(255);
  }

  return col;
}
