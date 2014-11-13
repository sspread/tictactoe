function Board() {
  this.squares = {};
}
Board.prototype = {
  newSquares: function(){
    var r, c;
    for (r = 1; r <= 3; r++) {
      for (c = 1; c <= 3; c++) {
        this.squares[[r,c]] = null;
      }
    }
  },
  updateSquares: function(coords, value) {
    this.squares[coords] = value;
    console.log(this.squares)
  },
  checkIfEmpty: function(coords) {
    return this.squares[coords] === null
  },
  corners: function() {
    var arr = [], r, c;
    for (r = 1; r <= 3; r+=2) {
      for (c = 1; c <= 3; c+=2) {
        arr.push([r,c]);
      }
    }
    return arr;
  },
  sides: function() {
    var arr = [], r, c;
    for (r = 1; r <= 3; r++) {
      for (c = 1; c <= 3; c++) {
        if ((r % 2 === 0 || c % 2 === 0) && !(r % 2 === 0 && c % 2 === 0 )) {
          arr.push([r,c]);
        }
      }
    }
    return arr;
  },
  oppositeCorner: function(coords) {
    return [4-coords[0], 4-coords[1]];
  },
  getWinningLocation: function(players) {
    var directions, i;
    directions = [
      this.getWinningRow,
      this.getWinningColumn,
      this.getWinningDiagonal
    ];
    for (i in directions) {
      if (directions[i].call(this, players)) {
        return directions[i].call(this, players);
      }
    }
    return false;
  },
  getWinningRow: function(players) {
    var i, squares, rows, key;
    for (i = 0; i < players.length; i++) {
      squares = this.squares;
      rows = {};
      for (r = 1; r <= 3; r++) {
        rows[r] = [];
        for (key in squares) {
          if (parseInt(key[0]) === r && squares[key] === players[i]) {
            rows[r].push(parseInt(key[2]));
          }
        }
        for (key in rows) {
          if (rows[key].length === 3) {
            return {orientation: 'row', number: key};
          }
        }
      }
    }
    return false;
  },
  getWinningColumn: function(players) {
    var i, squares, cols, c, key;
    for (i = 0; i < players.length; i++) {
      squares = this.squares;
      cols = {};
      for (c = 1; c <= 3; c++) {
        cols[c] = [];
        for (key in squares) {
          if (parseInt(key[2]) === c && squares[key] === players[i]) {
            cols[c].push(parseInt(key[0]));
          }
        }
        for (key in cols) {
          if (cols[key].length === 3) {
            return {orientation: 'col', number: key};
          }
        }
      }
    }
    return false;
  },
  getWinningDiagonal: function(players) {
    var i, squares, corners;
    for (i = 0; i < players.length; i++) {
      squares = this.squares;
      if (!squares[[2,2]]) {
        return false;
      } else {
        corners = this.corners();
        for (i = 0; i < corners.slice(0,2).length; i++) {
          if (squares[[2,2]] === squares[corners[i]] && squares[[2,2]] === squares[this.oppositeCorner(corners[i])]) {
            return {orientation: 'diag', number: corners[i][1]};
          }
        }      
      }
    }
    return false;
  },
};