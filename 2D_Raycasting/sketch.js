let walls = [];
let ray;
let xoff = 0;
let yoff = 100;

function setup() {
  createCanvas(400,400);
  for ( let i = 0 ; i < 10; i++){
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);
    walls[i] = new Boundary(x1,y1,x2,y2)
  }
  walls.push(new Boundary(0,0,width,0))
  walls.push(new Boundary(0,height,width, height))
  walls.push(new Boundary(0,0,0,height))
  walls.push(new Boundary(width,0,width,height))
  
  particle = new Particle();
  ray = new Ray(100,200);
}

function draw() {
  background(0)
  // let random1 = random(200);
  // let random2 = random(200);
  // wall = new Boundary(random1,random2,random2,random1)
  for ( let wall of walls ){
    wall.show();
  }
  particle.update(noise(xoff)*width,noise(yoff)*height);
  xoff += 0.005;
  yoff += 0.005;
  particle.show();
  particle.look(walls);

  // ray.setDir(mouseX, mouseY);
  
  // ray.show()
  // let pt = ray.cast(wall);
  // if ( pt ) {
  //     fill(255);
  //     ellipse(pt.x, pt.y, 8, 8)
  // }
  // noLoop();
}