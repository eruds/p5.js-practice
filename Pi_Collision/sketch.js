class box {
  constructor(mass, size, pos = 0, vel = 0, acc = 0){
    this.mass = mass
    this.size = size 
    this.pos = createVector(pos);
    this.vel = createVector(vel);
    this.acc = createVector(acc);
    this.maxSpeed = 10;
    this.color = color(random(255),random(255),random(255))
    if ( this.pos.x >= width - this.size ){
      this.pos.x = this.pos.x - this.size
    }

  }

  show(){
    stroke(this.color);
    noStroke()
    fill(this.color)
    rect(this.pos.x, height-this.size-20, this.size, this.size)
  }

  update(){
    this.edge()
    this.show()
    this.pos.add(this.vel)
    this.vel.add(0.5*this.acc)
    this.vel.limit(this.maxSpeed)
  }

  // checkCollision(boxes){
  //   for ( let box of boxes ){
  //     if ( box == this ){
  //       continue
  //     }
  //     if( box.pos.x == this.pos.x  ){
  //       this.vel.x = - this.vel.x
  //     }
  //   }
  // }

  edge(){
    if ( this.pos.x <= 0  || this.pos.x >= width-this.size){
      this.vel.x = - this.vel.x
      this.acc.x += 0.01*this.vel.x
      this.color = color(random(255),random(255),random(255))
    }
  }
}

function checkCollision(box1,box2){
  //function momentumChange()
  let d = abs( box1.pos.x - box2.pos.x)
  if ( d < box2.size ){
    box1.vel.x = - box1.vel.x
    box2.vel.x = - box2.vel.x
    box1.acc.x += - 0.01*box2.vel.x
    box2.acc.x += - 0.01*box1.vel.x
    box1.color = color(random(255),random(255),random(255))
    box2.color = color(random(255),random(255),random(255))
  }
}

let boxes = [];
let box1,box2;

function setup() {
  createCanvas(400,400);
  //boxes = [box1, box2];
  box1 = new box(100,100, random(width/2, width),-1,-0.01);
  box2 = new box(10, 50, random(width/2),1,0.01);
}

function draw() {
  background(0);
  stroke(255)
  fill(255)
  rect(0, height-20, width,20)
  noStroke()
  box1.show()
  box2.show()
  checkCollision(box1,box2)
  box1.update()
  box2.update()


  // for ( let box of boxes ){
  //   let d = 
  //   box.update();
  // }
  //noLoop()
}