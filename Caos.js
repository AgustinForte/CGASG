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
