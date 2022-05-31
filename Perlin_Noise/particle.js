function Particle() {
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0);
    this.acc = createVector(0);
    this.maxSpeed = 2 ;
    this.size = 2;

    this.prevPos = this.pos.copy();

    this.update = function(){
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.follow = function(vectors){
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
        
    }

    this.show = function(){
        stroke(0,10);
        strokeWeight( this.size );
        point(this.pos.x, this.pos.y)
        //line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        // ellipse(this.pos.x, this.pos.y, size, size);
    }

    this.edges = function() {
        if ( this.pos.x > width  ) {
            // this.vel.y = - this.vel.y
            // this.vel.x = - this.vel.x
            this.pos.x = 0;
        };
        if ( this.pos.x < 0  ){ 
            // this.vel.y = - this.vel.y
            // this.vel.x = - this.vel.x
            this.pos.x = width;
        };
        if ( this.pos.y > height  ) {
            // this.vel.x = - this.vel.x
            // this.vel.y = - this.vel.y
            this.pos.y = 0;
        };
        if ( this.pos.y < 0  ) {
            // this.vel.x = - this.vel.x
            // this.vel.y = - this.vel.y;
            this.pos.y = height ;
        };
    }

}