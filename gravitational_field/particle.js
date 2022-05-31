class Particle{
    constructor(){
        this.pos = createVector(random(width),random(height))
        this.vel = p5.Vector.random2D()
        this.acc = createVector(0,0);
        this.size = 5
        this.maxSpeed = 5;
    }

    show(){
        stroke(255)
        ellipse(this.pos.x, this.pos.y, this.size)
    }

    update(){
        let mouse = createVector(mouseX, mouseY)
        this.acc = p5.Vector.add(mouse)
        this.acc.setMag(0.2)
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.edge()
    }

    edge(){
        if( this.pos.x < 0 || this.pos.x >= width ){
            this.vel.x = - this.vel.x
        }
        if( this.pos.y < 0 || this.pos.y >= height ){
            this.vel.y = - this.vel.y
        }
    }

}