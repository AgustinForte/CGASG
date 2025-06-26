let obra;

function preload() {
  Pincelada.cargarPinceles();
}

function setup() {
  createCanvas(400, 800);
  obra = new Obra();
}

function draw() {
  obra.actualizar();
  obra.mostrar();
}
