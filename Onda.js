class Onda extends Pincelada {
  constructor(x) {
    super(Pincelada.pincelesOnda);
    this.x = x; 
    this.y = 0;
    this.escala = 1.0;     
  }
  dibujar(g) {
    g.tint(this.color);
    g.imageMode(CORNER);
    g.image(this.imagen, this.x, this.y, this.imagen.width * this.escala, this.imagen.height * this.escala);
    g.noTint();
  }
}
