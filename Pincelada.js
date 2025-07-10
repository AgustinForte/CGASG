class Pincelada {
  static pincelesFila = [];
  static pincelesOnda = [];
  static pincelesCaos = [];
  static pincelesCortas = [];
  static colores = [];
  static ultimoColor = null;

  static cargarPinceles() {
    for (let i = 1; i <= 22; i++) {
      let img = loadImage(`imagenes/${i}.png`);
      if (i <= 5) {
        this.pincelesFila.push(img);
      } else if (i <= 11) {
        this.pincelesOnda.push(img);
      } else if (i <= 17) {
        this.pincelesCaos.push(img);
      } else {
        this.pincelesCortas.push(img);
      }
    }

    this.colores = [
      color(208, 87, 76),
      color(40, 97, 164),
      color(193, 174, 80),
      color(12, 105, 84),
      color(0),
    ];
  }

  constructor(imagenes) {
    this.imagen = random(imagenes);
    this.colorBase = this.elegirColor();

    colorMode(HSB, 360, 100, 100, 255);
    this.h = hue(this.colorBase);
    this.b = brightness(this.colorBase);
    this.a = alpha(this.colorBase);
    this.s = saturation(this.colorBase);

    this.actualizarSaturacion(this.s);
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
    col.setAlpha(red(col) === 0 && green(col) === 0 && blue(col) === 0 ? 100 : 230);
    return col;
  }

  actualizarSaturacion(sat) {
    this.s = sat;
    this.color = color(this.h, this.s, this.b, this.a);
  }
}
