class Pincelada {
  static pincelesFila = [];
  static pincelesOnda = [];
  static pincelesCaos = [];
  static colores = [];
  static ultimoColor = null;

  static cargarPinceles() {
    for (let i = 1; i <= 17; i++) {
      let img = loadImage(`imagenes/${i}.png`);
      if (i <= 5) {
        this.pincelesFila.push(img);
      } else if (i <= 11) {
        this.pincelesOnda.push(img);
      } else {
        this.pincelesCaos.push(img);
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
