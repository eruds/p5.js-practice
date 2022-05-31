//let players = ['X','O'];
let Human = 'X'
let AI = 'O';
let currentPlayer;
let scale = 3;
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
      board[i][j] = '';
    }
  }
  if ( currentPlayer == AI ){
    bestMove()
  }
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner(){
  let winner = null 
  //Horizontal 
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }


  let available = [];
  for ( let i = 0; i < scale; i ++ ){
    for ( let j = 0; j < scale; j++ ){
      if( board[i][j] == '' ){
        available.push({i,j})
      } 
    }
  }

  if ( winner == null && available.length == 0 ){
      return 'tie'
  } else {
      return winner  
  }

}

let scores = {
  O:10,
  X:-10,
  tie:0
}

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = AI;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = Human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}


function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = AI;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = AI;
  currentPlayer = Human;
}


function mouseClicked(){
  if ( currentPlayer == Human ){
    let j = floor(mouseX/w)
    let i = floor(mouseY/h)
    if( board[i][j] == '' ){
      board[i][j] = Human
      currentPlayer = AI 
      bestMove()
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
  
  
  let result = checkWinner()
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
  }
}

// function nextTurn(){
//   //AI Turn 
//   let available = [];
//   for ( let i = 0; i < scale; i ++ ){
//     for ( let j = 0; j < scale; j++ ){
//       if( board[i][j] == '' ){
//         available.push({i,j})
//       } 
//     }
//   }
//   if ( available.length == 0 ) { return false }
//   let move = random(available) 
//   board[move.i][move.j] = AI
//   currentPlayer = Human
// }


// function checkWinner(){
//   let winner = null 
//   //Horizontal 
//   for ( let i = 0; i < scale; i++ ){
//       if ( board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][2] == board[i][3] && board[i][3] == board[i][4]){
//           winner = board[i][0]
//       }
//   }

//   //Vertical
//   for ( let i = 0; i < scale; i++ ){
//       if ( board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[2][i] == board[3][i] && board[3][i] == board[4][i]){
//           winner = board[0][i]
//       }
//   }

//   //Diagonal
//   if ( board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[2][2] == board[3][3] && board[3][3] == board[4][4] ){
//       winner = board[0][0]
//   }
//   if ( board [0][4] == board[1][3] && board[1][3] == board[2][2] && board [2][2] == board[3][1] && board[3][1] == board[4][0] ){
//       winner = board[0][4]
//   }

//   let available = [];
//   for ( let i = 0; i < scale; i ++ ){
//     for ( let j = 0; j < scale; j++ ){
//       if( board[i][j] == '' ){
//         available.push({i,j})
//       } 
//     }
//   }

//   if ( winner == null && available.length == 0  ){
//       return 'tie'
//   } else {
//       if ( winner != '' ) { return winner } 
//   }

// }