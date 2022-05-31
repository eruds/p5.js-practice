let particle;

function setup() {
  createCanvas(400,400)
  particle = new Particle();
}

function draw() {
  background(0);
  particle.show()
  particle.update()
}