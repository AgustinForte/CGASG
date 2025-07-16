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

    this.fft = new p5.FFT();
    this.fft.setInput(this.mic);

    this.tiempoUltimoSonido = millis();

    this.filas = [];
    this.ondas = [];
    this.caos = [];
    this.cortas = [];

    this.maxFilas = 400;
    this.maxCaos = 800;
    this.maxCortas = 350;
    this.maxOndas = 100;

   this.maxOndas = 20;
   this.separacionOnda = this.canvas.width / this.maxOndas;
   this.ondaX = this.separacionOnda / 2;
  }

  actualizar() {
    let vol = this.amp.getLevel();
    vol = constrain(vol, 0, 0.3);
    let ahora = millis();

    if (vol > this.umbralCambio && ahora - this.ultimoCambio > this.tiempoEspera) {
      let nuevoEstado = floor(random(4));
      while (nuevoEstado === this.estado) {
        nuevoEstado = floor(random(4));
      }
      this.estado = nuevoEstado;
      this.ultimoCambio = ahora;

      this.filas = [];
      this.ondas = [];
      this.caos = [];
      this.cortas = [];

      this.canvas.background(255);

      this.ondaX = -15;
    }

    if (millis() - this.ultimoCambio < 500) return;

    if (vol > Obra.AMP_MIN) {
      this.tiempoUltimoSonido = millis();

      this.fft.analyze();
      let energiaGraves = this.fft.getEnergy("lowMid");
      let energiaAgudos = this.fft.getEnergy("highMid");
      let satRaw = energiaGraves - energiaAgudos;
      let sat = map(satRaw, -150, 150, 10, 120);
      sat = constrain(sat, 10, 120);

      console.log('Saturación:', sat);

      if (this.estado === 0) {
        if (this.filas.length < this.maxFilas) {
          if (vol > Obra.AMP_MIN) {
            this.tiempoUltimoSonido = millis();
            const trazo = new Fila();
            this.filas.push(trazo);
            trazo.dibujar(this.canvas);
          }
        } else {
          for (let t of this.filas) {
            t.actualizarSaturacion(sat);
            t.dibujar(this.canvas);
          }
        }
      }

      else if (this.estado === 1) {
        if (this.ondas.length < this.maxOndas) {
          if (vol > Obra.AMP_MIN) {
            this.tiempoUltimoSonido = millis();
            const trazo = new Onda(this.ondaX);
            this.ondas.push(trazo);
            trazo.dibujar(this.canvas);
            this.ondaX += this.separacionOnda;
          }
        } else {
          for (let t of this.ondas) {
            t.actualizarSaturacion(sat);
            t.dibujar(this.canvas);
          }
        }
      }

      else if (this.estado === 2) {
        if (this.caos.length < this.maxCaos) {
          if (vol > Obra.AMP_MIN) {
            this.tiempoUltimoSonido = millis();
            const trazo = new Caos();
            this.caos.push(trazo);
            trazo.dibujar(this.canvas);
          }
        } else {
          for (let t of this.caos) {
            t.actualizarSaturacion(sat);
            t.dibujar(this.canvas);
          }
        }
      }

      else if (this.estado === 3) {
        if (this.cortas.length < this.maxCortas) {
          if (vol > Obra.AMP_MIN) {
            this.tiempoUltimoSonido = millis();
            const trazo = new Cortas();
            this.cortas.push(trazo);
            trazo.dibujar(this.canvas);
          }
        } else {
          for (let t of this.cortas) {
            t.actualizarSaturacion(sat);
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
