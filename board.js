function Board() {
  this.squares = {}
}

Board.prototype = {
  updateSquares: function(coords, value) {
    this.squares[coords] = value;
  },
  
  checkIfEmpty: function(coords) {
    var coords = coords.join(',')
    for (square in this.squares) {
      if (coords === square) {
        return false;
      }
    }
    return true;
  }
}