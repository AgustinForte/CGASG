class Caos extends Pincelada {
  constructor() {
    super(Pincelada.pincelesCaos);
    this.x = random(width);
    this.y = random(height);
    this.escala = 0.6;
  }
  dibujar(g) {
    g.tint(this.color);
    g.imageMode(CENTER);
    g.image(this.imagen, this.x, this.y, this.imagen.width * this.escala, this.imagen.height * this.escala);
    g.noTint();
  }
}

