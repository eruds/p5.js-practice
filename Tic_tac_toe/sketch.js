// let board = [
//   ['','',''],
//   ['','',''],
//   ['','',''],
// ]

let board = [
  ['','',''],
  ['','',''],
  ['','',''],
]

let player1 = 'X';
let player2 = 'O';

let player1Turn = true
let player2Turn = false;

let scale = 3;

function setup() {
  createCanvas(600,600)
}

function drawX(centerX, centerY ){
  let scale = 40
  let x1 = centerX - scale 
  let y1 = centerY - scale
  let x2 = centerX + scale
  let y2 = centerY + scale 
  line(x1,y1,x2,y2)
  line(x1+2*scale, y1, x2-scale*2, y2)
}

function drawCircle( centerX, centerY  ){
  let scale = 100  
  ellipse(centerX, centerY, scale)
}

function game(player1, player2){
  let w = width / scale 
  let h = height / scale 
  if ( player1 ){
    do {
      if ( mouseClicked()){
        let x = mouseX
        let y = mouseY 
        let i, j  = 0
        
      }
    } while ( spot != '' )
    board[i][j] = spot 
  } else ( player2 ){
    do {
      let i = floor(random(2))
      let j = floor(random(2))
      let spot = board[i][j]
      spot = 'X' 
    } while ( spot != '' )
    board[i][j] = spot 
  }
}

function draw() {
  background(255);
  let w = width / scale;
  let h = height / scale;
  let x = w 
  let y = h 

  for ( let i = 1 ; i <= scale; i++ ){
    line(x, 0, x, height)
    line(0,y,width,y)
    x *= i
    y *= i 
  }

  game(player1Turn, player2Turn)

  if ( player1Turn ){
    player1Turn = !player1Turn  
  } else {
    player2Turn = !player2Turn 
  }
  
  
  let centerX = w/2 

  for ( let i = 0; i < scale; i ++ ){
    let centerY = h/2 
    for ( let j = 0; j < scale; j++ ){
      let spot = board[j][i]
      if( spot == player1 ){
        drawX(centerX, centerY)
      } else if ( spot == player2 ) {
        drawCircle(centerX, centerY)
      }
      centerY += h 
    }
    centerX += w 
  }

}