class Obra {
  static AMP_MIN = 0.03;
  static TIEMPO_LIMITE = 3000;

  constructor() {
    this.canvas = createGraphics(400, 800);
    this.canvas.clear();
    this.estado = 0; 
    this.umbralCambio = 0.29; 
    this.ultimoCambio = 0;
    this.tiempoEspera = 1000; 

    userStartAudio();
    this.mic = new p5.AudioIn();
    this.mic.start();
    this.amp = new p5.Amplitude();
    this.amp.setInput(this.mic);

    this.tiempoUltimoSonido = millis();
    
    this.filas = [];
    this.ondas = [];
    this.caos = [];

    this.maxFilas = 200;
    this.maxOndas = 100;
    this.maxCaos = 600;
  }

  actualizar() {
  let vol = this.amp.getLevel();
  vol = constrain(vol, 0, 0.3);
  let ahora = millis();

  if (vol > this.umbralCambio && ahora - this.ultimoCambio > this.tiempoEspera) {
  let nuevoEstado = floor(random(3));
  while (nuevoEstado === this.estado) {
    nuevoEstado = floor(random(3));
  }
  this.estado = nuevoEstado;
  this.ultimoCambio = ahora;

  this.filas = [];
  this.ondas = [];
  this.caos = [];

  this.canvas.background(255);
}

  if (millis() - this.ultimoCambio < 500) return;

  if (vol > Obra.AMP_MIN) {
    this.tiempoUltimoSonido = millis();

    if (this.estado === 0) {
      if (this.filas.length < this.maxFilas) {
        const trazo = new Fila();
        this.filas.push(trazo);
        trazo.dibujar(this.canvas);
      } else {
        for (let t of this.filas) {
          t.dibujar(this.canvas); 
        }
      }
    }

    else if (this.estado === 1) {
      if (this.ondas.length < this.maxOndas) {
        const trazo = new Onda();
        this.ondas.push(trazo);
        trazo.dibujar(this.canvas);
      } else {
        for (let t of this.ondas) {
          t.dibujar(this.canvas);
        }
      }
    }

    else if (this.estado === 2) {
      if (this.caos.length < this.maxCaos) {
        const trazo = new Caos();
        this.caos.push(trazo);
        trazo.dibujar(this.canvas);
      } else {
        for (let t of this.caos) {
          t.dibujar(this.canvas);
        }
      }
    }
  }

  const sinSonido = millis() - this.tiempoUltimoSonido;

  if (sinSonido > Obra.TIEMPO_LIMITE) {
    this.canvas.noStroke();
    this.canvas.fill(255, 255, 255, 2);
    this.canvas.rect(0, 0, width, height);
  }

  if (sinSonido > Obra.TIEMPO_LIMITE * 2) {
    this.canvas.background(255);
    this.filas = [];
    this.ondas = [];
    this.caos = [];
  }
}

mostrar() {
    image(this.canvas, 0, 0);
  }
}
