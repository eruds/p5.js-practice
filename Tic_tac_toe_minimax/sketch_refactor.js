//let players = ['X','O'];
let Human = 'X'
let AI = 'O';
let currentPlayer;
let scale = 5;
let w,h;


let board = new Array(scale);
let available = new Array(scale);

function drawX(centerX, centerY ){
  let scale = 30
  let x1 = centerX - scale 
  let y1 = centerY - scale
  let x2 = centerX + scale
  let y2 = centerY + scale 
  line(x1,y1,x2,y2)
  line(x1+2*scale, y1, x2-scale*2, y2)
}

function drawCircle( centerX, centerY ){
  let scale = 70  
  ellipse(centerX, centerY, scale)
}


function setup() {
  createCanvas(600,600)
  
  w = width / scale;
  h = height / scale;
  currentPlayer = Human
  for ( let i = 0; i < scale; i ++ ){
    board[i] = new Array(scale)
    for ( let j = 0; j < scale; j ++ ){
      board[i][j] = '_';
    }
  }
  if ( currentPlayer == AI ){
    bestMove()
  }
}



function mouseClicked(){
  if ( currentPlayer == Human ){
    let j = floor(mouseX/w)
    let i = floor(mouseY/h)
    if( board[i][j] == '_' ){
      let available = [];
      board[i][j] = Human
      currentPlayer = AI 
      for ( let i = 0; i < scale; i++ ){
        for ( let j = 0; j < scale; j++){
          if ( board[i][j] == '_'){
            available.push({i,j})   
          }
        }
      }
      let result = checkWinner(board)
      let resultP = createP('')
      resultP.style('font-size', '32pt')
      //resultP.style('padding', '10px')
      if ( result != null ){
        noLoop()
        if ( result == 'tie' ){
          resultP.html("Tie!")
        } else {
          resultP.html(`${result} won!`)
        }
        return 
      }
      bestMove(available)
    }
  }
}

function draw() {
  background(255);
  strokeWeight(10)
  let x = 0 
  let y = 0 

  for ( let i = 0 ; i <= scale; i++ ){
      line(x, 0, x, height)
      line(0,y,width,y)
      x += w
      y += h  
  }
  let centerX = w/2 

  for ( let i = 0; i < scale; i ++ ){
      let centerY = h/2 
      for ( let j = 0; j < scale; j++ ){
        let spot = board[j][i]
        if( spot == Human ){
            drawX(centerX, centerY)
        } else if ( spot == AI ) {
            drawCircle(centerX, centerY)
        }
        centerY += h 
      }
      centerX += w 
  }
  
  
  
}


