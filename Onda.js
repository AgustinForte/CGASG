class Onda extends Pincelada {
  constructor(x) {
    super(Pincelada.pincelesOnda);
    this.x = x;
    this.escala = 1.0;
  }

  dibujar(g) {
    g.tint(this.color);
    g.imageMode(CENTER);

    let imgW = this.imagen.width * this.escala;
    let imgH = this.imagen.height * this.escala;

    
    for (let y = -imgH / 2; y < g.height + imgH; y += imgH * 0.85) {
      let offsetX = sin((y + frameCount) * 0.02 + this.x * 0.01) * 20;
      g.image(this.imagen, this.x + offsetX, y, imgW, imgH);
    }

    g.noTint();
  }
}
