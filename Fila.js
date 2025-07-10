class Fila extends Pincelada {
  constructor() {
    super(Pincelada.pincelesFila);
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

