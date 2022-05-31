
let scale = 20;
let grid;


class Node { 
  constructor(x, y, status){
    this.x = x 
    this.y = y 
    this.status = status 
    this.color = '#ffffff'
  }

 
}

class Grid {
  constructor( rows, cols ){
    this.rows = rows 
    this.cols = cols 
    this.values = []
    for ( let i = 0; i < rows; i++ ){
      this.values[i] = new Array()
      for ( let j = 0; j < cols; j++ ){
        this.values[i].push(new Node(i,j, true))
      }
    }
  }

  

  show(){
    let grid = this.values
    for ( let i = 0; i < this.rows; i++ ){
      for ( let j = 0; j < this.cols; j++ ){
        let node = grid[i][j]
        fill(node.color)
        rect(node.x*scale, node.y*scale, scale  )
      }
    }
  }

  getNeighbor( node ){
    let neighbor = []
    let refX = node.x - 1
    let refY = node.y - 1 
    if ( refX < 0 ) { refX = 0 }
    if ( refY < 0 ) { refY = 0 }

    let endX = refX == 0 ? refX + 2 : refX + 3
    let endY = refY == 0 ? refY + 2 : refY + 3
    if ( endX > this.cols ) { endX = this.cols }
    if ( endY > this.rows ) { endY = this.rows }
    for ( let i = refX; i < endX; i++ ){
      for ( let j = refY; j < endY; j ++ ){
        let spot = {i,j}
        if ( i == node.x && j == node.y ) {
          continue 
        }
        neighbor.push(spot)
      }
    }

    return neighbor
  }
  
  


  traverse( start , end ){
    let open = []
    let closedSet = []
    let distances, previous = {}
    let current = start 
    open = this.getNeighbor(current)
    for ( let item in open ){
      distances.
    }
  }
}



function setup() {
  createCanvas(400,400)
  let w = round(width/scale) ; 
  let h = round(height/scale)  ;
  grid = new Grid(h,w)
}

function mouseDragged(){
  let x = floor(mouseX / scale)   
  let y = floor(mouseY / scale) 
  grid.values[y][x].color = '#000000' 
}

function draw() {
  grid.traverse( grid.values[0][0], grid.values[2][2] )
  grid.show()
  console.log(grid)
  noLoop()
}