let rows, cols;
let scale = 20;
let fr;
let zoff = 0;
let particle = [];
let flowField = [];

function setup() {
  createCanvas(400,400);
  rows = floor(height/scale);
  cols = floor(width/scale);
  fr = createP('');
  
  flowField = new Array(cols*rows);
  
  for (let i = 0; i < 2000; i++) {
    particle[i] = new Particle();
  }
  background(255)
}

function draw() {
 // background(255)
  var inc = 0.3;
  var yoff = 0;
  for ( var y = 0 ; y < rows; y ++ ){
    var xoff = 0;
    for ( var x = 0; x < cols; x++){
      let index = x + y * cols;
      //let r = noise(xoff,yoff)*255;
      let angle = noise(xoff,yoff, zoff)*TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(10);
      flowField[index] = v;
      xoff += inc;
      stroke(0);
      strokeWeight(0.5); 
      push();
      translate( x * scale, y * scale);
      rotate(v.heading());
      //line(0,0, scale, 0);
      pop();
    }
    zoff+= 0.0005;
    yoff += inc ;
  }

  for (let i = 0; i < particle.length; i++) {
    particle[i].follow(flowField);
    particle[i].update();
    particle[i].edges();
    particle[i].show();
  } 
  fr.html(floor(frameRate()));
  //noLoop()
}

// var x = map(noise(xoff1), 0 , 1 , 0, width)
// var y = map(noise(xoff2), 0 , 1 , 0, height)
// var size = 10
// ellipse(x,y,size,size)
// xoff1 += 0.01
// xoff2 += 0.01

// for ( var y = 0 ; y < height; y ++ ){
//   var xoff = 0;
//   for ( var x = 0; x < width; x++){
//     var index = ( x + y * width ) * 4;
//     var r = noise(xoff,yoff)*255;
//     pixels[index] = 255;
//     pixels[index+1] = 0;
//     pixels[index+2] = 0;
//     pixels[index+3] = 255;
//     xoff += inc;
//   }
//   yoff += inc;
// }

// stroke(255)
// noFill()
// beginShape()
// var inc = 0.01;
// var xoff = start;
// for ( var x = 0; x <= width ; x++ ){
//   stroke(255)
//   var y = sin(xoff)*height;
//   vertex(x,y);
//   xoff += inc;
// }
// endShape()
// start += inc