function Board() {
  this.squares = {}
}

Board.prototype = {
  updateSquares: function(coords, value) {
    this.squares[coords] = value;
  },
  checkIfEmpty: function(coords) {
    for (square in this.squares) {
      // console.log("square")
      // console.log(square.length)
      // console.log("coords")
      // console.log(coords)

      if (coords === square) {
        return false;
      }
    }
    return true;
  }
}