function equalFive(a,b,c,d,e){
    return a == b && b == c && c == d && d == e && a != '_'
}

function equalTwo(a,b){
    return a == b && a != '_'
}
  
function equalThree(a,b,c){
    return a == b && b == c && a != '_'
}

function equalFour(a,b,c,d){
    return a == b && b == c && c == d && a != '_'
}


function isMoveLeft(){
for ( let i = 0; i < scale; i ++ ){
    for ( let j = 0; j < scale; j++ ){
        if( board[i][j] == '_' ){
            return true 
            } 
        }
    }
    return false 
}

  

function checkTwo( board , player){
    //Horizontal 
    for ( let i = 0; i < scale; i++ ){
        for ( let j = 0; j < scale-1; j++ ){
            if ( equalTwo(board[i][j], board[i][j+1]) ){
                if ( board [i][j] == player )
                { return true }
            }
        }
    }

    //Vertical 
    for ( let i = 0; i < scale; i++ ){
        for ( let j = 0; j < scale-1; j++ ){
            if ( equalTwo(board[j][i], board[j+1][i]) ){
                if ( board [j][i] == player )
                { return true }
            }
        }
    }

    //Diagonal 
    for ( let i = 0; i < scale - 1; i++ ){
        let x = scale - i - 1
        if ( equalTwo(board[i][i], board[i+1][i+1] ) || equalTwo(board[i][x], board[i+1][x-1]) ){
            if ( board [i][i] == player )
                { return true }
        }
    }

    return false 

}

function checkThree( board , player){
    //Horizontal 
    for ( let i = 0; i < scale; i++ ){
        for ( let j = 0; j < scale-2; j++ ){
            if ( equalThree(board[i][j], board[i][j+1], board[i][j+2]) ){
                if ( board [i][j] == player )
                { return true }
            }
        }
    }

    //Vertical 
    for ( let i = 0; i < scale; i++ ){
        for ( let j = 0; j < scale-2; j++ ){
            if ( equalThree(board[j][i], board[j+1][i], board[j+2][i]) ){
                if ( board [j][i] == player )
                { return true }
            }
        }
    }

    //Diagonal 
    for ( let i = 0; i < scale - 2; i++ ){
        let x = scale - i - 1
        if ( equalThree(board[i][i], board[i+1][i+1], board[i+2][i+2] ) || equalThree(board[i][x], board[i+1][x-1], board[i+2][x-2]) ){
            if ( board [i][i] == player )
                { return true }
        }
    }

    return false 

}

function checkFour( board , player){
    //Horizontal 
    for ( let i = 0; i < scale; i++ ){
        for ( let j = 0; j < scale-3; j++ ){
            if ( equalFour(board[i][j], board[i][j+1], board[i][j+2], board[i][j+3]) ){
                if ( board [i][j] == player )
                { return true }
            }
        }
    }

    //Vertical 
    for ( let i = 0; i < scale; i++ ){
        for ( let j = 0; j < scale-3; j++ ){
            if ( equalFour(board[j][i], board[j+1][i], board[j+2][i], board[j+3][i]) ){
                if ( board [j][i] == player )
                { return true }
            }
        }
    }

    //Diagonal 
    for ( let i = 0; i < scale - 3; i++ ){
        let x = scale - i - 1
        if ( equalThree(board[i][i], board[i+1][i+1], board[i+2][i+2], board[i+3][i+3] ) || equalThree(board[i][x], board[i+1][x-1], board[i+2][x-2], board[i+3][x-3]) ){
            if ( board [i][i] == player )
                { return true }
        }
    }

    return false 

}


function checkWinner(board){
    let winner = null 
    //Horizontal 
    //console.log(board)
    for ( let i = 0; i < scale; i++ ){
        if ( equalFive( board[i][0],board[i][1],board[i][2],board[i][3],board[i][4] )){
            winner = board[i][0]
        }
    }

    //Vertical
    for ( let i = 0; i < scale; i++ ){
        if ( equalFive(board[0][i],board[1][i],board[2][i],board[3][i],board[4][i])){
            winner = board[0][i]
        }
    }

    //Diagonal
    if ( equalFive( board[0][0],board[1][1],board[2][2],board[3][3],board[4][4] )){
        winner = board[0][0]
    }
    if ( equalFive( board [0][4],board[1][3],board [2][2],board[3][1],board[4][0] ) ){
        winner = board[0][4]
    }

    if ( winner == null && !isMoveLeft()){
        return 'tie'
    } else {
        return winner 
    }

}

function minimax ( board, depth, isMaximizing ){
    //Evaluate the score 
    let score = checkWinner(board)
    let player = isMaximizing ? AI : Human
    if ( score != null ) {
        return isMaximizing ? 20 : -20 
    } else if ( score == 'tie'){
        return 0 
    } else if ( depth == 0 ){
        if ( checkFour(board, player) ){
            //Four in a row
            score = isMaximizing ? 15 : -15
        } else if ( checkThree(board, player) ){
            //Three in a row
            score = isMaximizing ? 10 : -10
        } else if ( checkTwo(board, player) ){
            // Two in a row
            score = isMaximizing ? 5 : -5
        } else {
            // No consecutive placement
            score =  0; 
        }
        
        return score
    }
    
    //Ai Turn 
    if ( isMaximizing ){
        let bestScore = -Infinity; 
        for( let i = 0; i < scale; i ++ ){
            for ( let j = 0; j < scale; j++ ){
                board[i][j] = AI
                let score = minimax(board, depth-1, !isMaximizing)
                console.log(i,j, "TEST1")
                console.log(depth)
                board[i][j] = '_'
                bestScore = max(bestScore, score)
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity; 
        for( let i = 0; i < scale; i ++ ){
            for ( let j = 0; j < scale; j++ ){
                board[i][j] = Human
                let score = minimax(board, depth-1, !isMaximizing)
                console.log(i,j, "TEST2")
                console.log(depth)
                board[i][j] = '_'
                bestScore = min(bestScore, score)
            }
        }
        return bestScore
    }



}

function bestMove(available){
    let bestScore = -Infinity;
    let move;
    for ( let i = 0; i < scale; i++ ){
        for ( let j = 0; j < scale; j++){
            if( board[i][j] == '_' ){
                board[i][j] = AI 
                let score = minimax(board, 3, false)
                board[i][j] = '_'
                if ( bestScore < score ){
                    bestScore = score
                    move = {i,j}
                }
            }
        }
    }
    board[move.i][move.j] = AI 
    currentPlayer = Human 
}


// function minimax ( board, available, depth, isMaximizing ){
//     //Evaluate the score 
//     let score = checkWinner(board)
//     let player = isMaximizing ? AI : Human
//     if ( score != null ) {
//         return isMaximizing ? 20 : -20 
//     } else if ( score == 'tie'){
//         return 0 
//     } else if ( depth == 0 ){
//         if ( checkFour(board, player) ){
//             //Four in a row
//             score = isMaximizing ? 15 : -15
//         } else if ( checkThree(board, player) ){
//             //Three in a row
//             score = isMaximizing ? 10 : -10
//         } else if ( checkTwo(board, player) ){
//             // Two in a row
//             score = isMaximizing ? 5 : -5
//         } else {
//             // No consecutive placement
//             score =  0; 
//         }
//         console.log(score)
        
//         return score
//     }