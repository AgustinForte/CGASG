class Fila extends Pincelada {
  constructor(volumen) {
    super(Pincelada.pincelesFila);
    this.x = random(width); 
    this.y = random(height);
    this.escala = 1.0;
  }

  dibujar(g, vol = 0) {
    let escalaFinal = this.escala;
    if (vol > 0) {
      escalaFinal *= map(vol, Obra.AMP_MIN, 0.3, 1.0, 2.0);
    }

    g.tint(this.color);
    g.imageMode(CENTER);
    g.image(this.imagen, this.x, this.y, this.imagen.width * escalaFinal, this.imagen.height * escalaFinal);
    g.noTint();
  }
}

