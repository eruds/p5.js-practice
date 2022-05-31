let particles = [];

function setup() {
  createCanvas(400,400);
  for (let index = 0; index < 10; index++) {
    particles.push(new Particle())
  }
}

function draw() {
  background(0)
  for ( let i = 0; i < particles.length; i++ ){
    particles[i].update()
    for ( let j = 0; j < particles.length; j ++){
      if( j != i && particles[i].collision(particles[j])){
        particles[i].vel.x = - particles[i].vel.x
        particles[i].vel.y =   particles[i].vel.y
        particles[j].vel.x = - particles[j].vel.x
        particles[j].vel.y =   particles[j].vel.y
      }
    }
    
    particles[i].show()
  }
}