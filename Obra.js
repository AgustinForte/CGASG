class Obra {
  static AMP_MIN = 0.03;
  static TIEMPO_LIMITE = 3000;

  constructor() {
    this.canvas = createGraphics(400, 800);
    this.canvas.clear();

    userStartAudio();
    this.mic = new p5.AudioIn();
    this.mic.start();
    this.amp = new p5.Amplitude();
    this.amp.setInput(this.mic);

    this.tiempoUltimoSonido = millis();
    
    // listas por tipo
    this.filas = [];
    this.ondas = [];
    this.caos = [];

    // límites por grupo
    this.maxFilas = 20;
    this.maxOndas = 15;
    this.maxCaos = 10;
  }

  actualizar() {
  let vol = this.amp.getLevel();
  vol = constrain(vol, 0, 0.3);

  if (vol > Obra.AMP_MIN) {
    this.tiempoUltimoSonido = millis();

    if (vol < 0.1) {
      if (this.filas.length < this.maxFilas) {
        let trazo = new Fila();
        trazo.dibujar(this.canvas);
        this.filas.push(trazo);
      }
    } else if (vol < 0.2) {
      if (this.ondas.length < this.maxOndas) {
        let trazo = new Onda();
        trazo.dibujar(this.canvas);
        this.ondas.push(trazo);
      }
    } else {
      if (this.caos.length < this.maxCaos) {
        let trazo = new Caos();
        trazo.dibujar(this.canvas);
        this.caos.push(trazo);
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
