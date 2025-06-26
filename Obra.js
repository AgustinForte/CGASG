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
    this.yFila = 0;
  }

  actualizar() {
    let vol = this.amp.getLevel();
    vol = constrain(vol, 0, 0.3);

    if (vol > Obra.AMP_MIN) {
      this.tiempoUltimoSonido = millis();

      let trazo;

      if (vol < 0.1) {
        trazo = new Fila();
      } else if (vol < 0.2) {
        trazo = new Onda();
      } else {
        trazo = new Caos();
      }

      trazo.dibujar(this.canvas);
    }

    const sinSonido = millis() - this.tiempoUltimoSonido;

    if (sinSonido > Obra.TIEMPO_LIMITE) {
      this.canvas.noStroke();
      this.canvas.fill(255, 255, 255, 2);
      this.canvas.rect(0, 0, width, height);
    }

    if (sinSonido > Obra.TIEMPO_LIMITE * 2) {
      this.canvas.background(255);
    }
  }

  mostrar() {
    image(this.canvas, 0, 0);
  }
}
