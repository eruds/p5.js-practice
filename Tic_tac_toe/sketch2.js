// let board = [
//   ['','',''],
//   ['','',''],
//   ['','',''],
// ]
  
function drawX(centerX, centerY ){
    let scale = 40
    let x1 = centerX - scale 
    let y1 = centerY - scale
    let x2 = centerX + scale
    let y2 = centerY + scale 
    line(x1,y1,x2,y2)
    line(x1+2*scale, y1, x2-scale*2, y2)
  }
  
function drawCircle( centerX, centerY ){
    let scale = 100  
    ellipse(centerX, centerY, scale)
}

let board = [
    ['','',''],
    ['','',''],
    ['','',''],
  ]

let available = [
    [0,0],[0,1],[0,2],
    [1,0],[1,1],[1,2],
    [2,0],[2,1],[2,2]
]

  let players = ['X','O'];
  let currentPlayer;
  
  let scale = 3;


function setup() {
    createCanvas(600,600)
    currentPlayer = floor(random(players.length))
}

function locateMouse(){
    let w = width/scale
    let h = height/scale
    for ( let i = 1; i <= scale; i ++){
        for( let j = 1; j <= scale; j ++){
            if( mouseX < w && mouseY < h){
                return i-1,j-1 
            }
            h *= j
        }
        w *= i
    }
}
  
function nextTurn(){
    let index = floor(random(available.length));
    let spot = available.splice(index,1)[0]
    let i = spot[0]
    let j = spot[1]
    board[i][j] = players[currentPlayer]
    currentPlayer = (currentPlayer+1) % players.length
}

function checkWinner(){
    let winner = null 
    //Horizontal 
    for ( let i = 0; i < 3; i++ ){
        if ( board[i][0] == board[i][1] && board[i][1] == board[i][2] ){
            winner = board[i][0]
        }
    }

    //Vertical
    for ( let i = 0; i < 3; i++ ){
        if ( board[0][i] == board[1][i] && board[1][i] == board[2][i] ){
            winner = board[0][i]
        }
    }

    //Diagonal
    if ( board[0][0] == board[1][1] && board[1][1] == board[2][2] ){
        winner = board[0][0]
    }
    if ( board [0][2] == board[1][1] && board[1][1] == board[2][0] ){
        winner = board[0][2]
    }
    if ( winner == null && available.length == 0 ){
        return 'tie'
    } else {
        if ( winner != '' ) { return winner } 
    }

}

function mouseClicked(){
    // if ( players[currentPlayer] == 'X'){
    //     let i, j = locateMouse()
    //     let spot = available.splice(i, 1)[0]
    //     board[i][j] = currentPlayer
    //     currentPlayer = (currentPlayer+1) % players.length 
    // }
    let result = checkWinner()
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if ( result != null ){
        noLoop();
        if ( result == 'tie'){
            resultP.html('Tie!');
            
        } else {
            resultP.html(`${result} wins!`)
        }
    } else {
        nextTurn()
    }
    //console.log(`${mouseX} ${mouseY}`)
}

function draw() {
    background(255);
    strokeWeight(10)
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

    let centerX = w/2 

    for ( let i = 0; i < scale; i ++ ){
        let centerY = h/2 
        for ( let j = 0; j < scale; j++ ){
        let spot = board[j][i]
        if( spot == players[0] ){
            drawX(centerX, centerY)
        } else if ( spot == players[1] ) {
            drawCircle(centerX, centerY)
        }
        centerY += h 
        }
        centerX += w 
    }
    
    
    
}