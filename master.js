function Master(board) {
  this.board = board;
  this.squares = this.board.squares
}

Master.prototype = {

  move: function() {
    var moveFunctions, i, currentCheck;
    moveFunctions = [
      this.checkRows,
      this.checkColumns,
      this.checkDiagonals,
      this.checkOppositeCorners,
      this.checkDangerCorners,
      this.findOpenCorner,
      this.findOpenSquare
    ];
    for (i = 0; i < moveFunctions.length; i++) {
      currentCheck = moveFunctions[i].call(this)
      if (currentCheck) {
        return currentCheck;
      }
    }
  },
  findOpenSquare: function() {
    var r, c;
    for (r = 1; r <= 3; r++) {
      for (c = 1; c <= 3; c++) {
        if (!this.squares[[r,c]]) {
          return [r,c];
        }
      }
    }
  },
  checkRows: function() {
    var rows = {}, r, tempKey, key, missingRow;
    for (r = 1; r <= 3; r++) {
      rows[r] = [];
      for (key in this.squares) {
        if (parseInt(key[0]) === r) {
          rows[r].push(parseInt(key[2]));
        }
      }
    }
    for (key in rows) {
      if (rows[key].length === 2) {
        if (this.squares[[key,rows[key][0]]] === this.squares[[key,rows[key][1]]]) {
          if (this.squares[[key,rows[key][0]]] === "master") {
            missingRow = this.findMissingCoord(rows[key]);
            return [key, missingRow];
          } else {
            tempKey = key;
          }
        }
      }
    }
    if (tempKey) {
      missingRow = this.findMissingCoord(rows[tempKey]);
      return [tempKey, missingRow];
    }
  },
  checkColumns: function() {
    var cols = {}, c , key, tempKey, missingRow;
    for (c = 1; c <= 3; c++) {
      cols[c] = [];
      for (key in this.squares) {
        if (parseInt(key[2]) === c) {
          cols[c].push(parseInt(key[0]));
        }
      }
    }
    for (key in cols) {
      if (cols[key].length === 2) {
        if (this.squares[[cols[key][0],key]] === this.squares[[cols[key][1],key]]) {
          if (this.squares[[cols[key][0],key]] === "master") {
            missingRow = this.findMissingCoord(cols[key]);
            return [missingRow, key];
          } else {
            tempKey = key;
          }
        }
      }
    }
    if (tempKey) {
      missingRow = this.findMissingCoord(cols[tempKey]);
      return [missingRow, tempKey];
    }
  },
  checkDangerCorners: function() {
    var corners = this.board.corners(), i;
    for (i = 0; i < corners.length; i++) {
      if (this.squares[[2,2]] && this.squares[corners[i]] && !this.squares[this.board.oppositeCorner(corners[i])]) {
        return this.board.oppositeCorner(corners[i]);
      }
    }
  },
  checkOppositeCorners: function() {
    var corners = this.board.corners(), i;
    for (i = 0; i < corners.length; i++) {
      if (this.squares[corners[i]] && this.squares[corners[i]] === this.squares[this.board.oppositeCorner(corners[i])]) {
        return this.findOpenSide(this.squares);
      }
    }
  },
  checkDiagonals: function() {
    if (this.squares[[2,2]]) {
      console.log(this.board)
      var corners = this.board.corners(), i;
      for (i = 0; i < corners.length; i++) {
        if (this.squares[corners[i]] === this.squares[[2,2]] && !this.squares[this.board.oppositeCorner(corners[i])]) {
          return this.board.oppositeCorner(corners[i]);
        }
      }
    } else {
      return [2,2];
    }
  },
  findOpenCorner: function() {
    var corners = this.board.corners(), i;
    for (i = 0; i < corners.length; i++) {
      if (!this.squares[corners[i]]) {
        return corners[i];
      }
    }
  },
  findOpenSide: function() {
    var sides = this.board.sides(), i;
    for (i = 0; i < sides.length; i++) {
      if (!this.squares[sides[i]]) {
        return sides[i];
      }
    }
  },
  findMissingCoord: function(arr) {
    return [1,2,3].filter(function(n) {
      return arr.indexOf(n) < 0;
    })[0];
  },
};