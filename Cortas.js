class Cortas extends Pincelada {
  constructor() {
    super(Pincelada.pincelesCortas);
    this.x = random(width); 
    this.y = random(height);
    this.escala = 0.7;     
  }
  dibujar(g) {
    g.tint(this.color);
    g.imageMode(CENTER);
    g.image(this.imagen, this.x, this.y, this.imagen.width * this.escala, this.imagen.height * this.escala);
    g.noTint();
  }
}
