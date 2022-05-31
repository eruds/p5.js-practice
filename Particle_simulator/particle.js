class Particle {
    constructor(){
        this.pos = createVector(random(width), random(height))
        this.vel = createVector(random(-1,1)*3, random(-1,1)*2);
        this.acc = createVector(random(),random());
        this.maxSpeed = 10;
        this.color = color(random(255),random(255),random(255))
        this.size = 10;
        this.mass = 1;
        //this.energy = this.mass*9.8*(height-this.pos.y)
    }

    show(){
        stroke(255,50);
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.size*2)
    }

    update(){
        //this.applyGravity()
        this.pos.add(this.vel);
        //this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed)
        this.edge()
    }

    energyChange(){
        
    }

    collision(particle){
        let d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
        if ( d <= this.size*2 ){
            return true 
        } else {
            return false
        }
    }

    // applyGravity(){
    //     this.acc.y += 9.8*this.mass
    // }

    applyForce(force){
        this.acc.add(force/mass)
    }

    edge(){
        
        if ( this.pos.x <= this.size || this.pos.x >= width - this.size ){
            this.vel.x = - this.vel.x
            this.acc.x = - this.acc.x
            if ( this.pos.x < 0 ){ this.pos.x = this.size*2 }
        } 
        if ( this.pos.y <= this.size || this.pos.y >= height - this.size ){
            this.vel.y = - this.vel.y
            this.acc.y = - this.acc.y
            if ( this.pos.y < 0 ){ this.pos.y = 0 }
            if ( this.pos.y > height - this.size ){ this.pos.y = height - this.size }
        }
    }
}