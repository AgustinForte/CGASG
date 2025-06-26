class Pincelada {
  static pinceles = [];
  static colores = [];
  static ultimoColor = null;

  static cargarPinceles() {
    for (let i = 1; i <= 17; i++) {
      let img = loadImage(`imagenes/${i}.png`);
      this.pinceles.push(img);
    }

    this.colores = [
      color(208, 87, 76),
      color(40, 97, 164),
      color(193, 174, 80),
      color(12, 105, 84),
      color(0),
    ];
  }

  constructor() {
    this.imagen = random(Pincelada.pinceles);
    this.color = this.elegirColor();
  }

  elegirColor() {
    let col;
    do {
      col = color(random(Pincelada.colores));
    } while (
      Pincelada.ultimoColor &&
      red(col) === red(Pincelada.ultimoColor) &&
      green(col) === green(Pincelada.ultimoColor) &&
      blue(col) === blue(Pincelada.ultimoColor)
    );

    Pincelada.ultimoColor = col;

    if (red(col) === 0 && green(col) === 0 && blue(col) === 0) {
      col.setAlpha(100);
    } else {
      col.setAlpha(230);
    }

    return col;
  }
}

// TONOS BAJOS

class Fila extends Pincelada {
  constructor() {
    super();
    this.x = random(width); 
    this.y = random(height);
    this.escala = 0.4;       
  }

  dibujar(g) {
    g.tint(this.color);
    g.imageMode(CENTER);
    g.image(this.imagen, this.x, this.y, this.imagen.width * this.escala, this.imagen.height * this.escala);
    g.noTint();
  }
}

//TONOS MEDIOS

class Onda extends Pincelada {
  constructor() {
    super();
    this.x = random(width); 
    this.y = random(height);
    this.escala = 1.0;       
  }
  dibujar(g) {
    g.tint(this.color);
    g.imageMode(CENTER);
    g.image(this.imagen, this.x, this.y, this.imagen.width * this.escala, this.imagen.height * this.escala);
    g.noTint();
  }
}

// TONOS ALTOS

class Caos extends Pincelada {
  constructor() {
    super();
    this.x = random(width);
    this.y = random(height);
    this.escala = 2.0;      
    this.angulo = random(TWO_PI);
  }

  dibujar(g) {
    g.push();
    g.translate(this.x, this.y);
    g.rotate(this.angulo);
    g.tint(this.color);
    g.imageMode(CENTER);
    g.image(this.imagen, 0, 0, this.imagen.width * this.escala, this.imagen.height * this.escala);
    g.noTint();
    g.pop();
  }
}


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
