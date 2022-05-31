let dataset = []
let scale = 0.5 
let j = 0;

function setup() {
  createCanvas(600,800)
  for ( let i = 0; i < width/scale; i++ ){
    dataset.push(random(0,500))
  }
}


function draw() {
  background(0)
  let x = 0;
  let min = Infinity;
  let index = j;
  //console.log(dataset)
  for ( let i = 0; i < dataset.length; i++ ){
    stroke(0);
    strokeWeight(0)
    fill(250)
    rect(x, height-dataset[i], scale, dataset[i])
    x += scale 
  }

  for ( let i = j; i < dataset.length; i++){
    if ( dataset[i] < min ){
      min = dataset[i]
      index = i
    }
  }
  temp = dataset[j]
  dataset[j] = min
  dataset[index] = temp
  j+=1
}