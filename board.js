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
  },
  clearSquares: function() {
    this.squares = {}
  },
  corners: function() {
    arr = []
    for (var r = 1; r <= 3; r+=2) {
      for (var c = 1; c <= 3; c+=2) {
        arr.push([r,c])
      }
    }
    return arr;
  },
}