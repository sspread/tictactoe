function Master() {}

Master.prototype = {

  move: function(squares) {
    var moveFunctions = [
      this.checkRows,
      this.checkColumns,
      this.checkDiagonals,
      this.checkOppositeCorners,
      this.checkDangerCorners,
      this.findOpenCorner,
      this.findOpenSquare
    ];
    for (var i in moveFunctions) {
      if (moveFunctions[i].call(this, squares)) {
        return moveFunctions[i].call(this, squares);
      }
    }
  },
  findOpenSquare: function(squares) {
    for (var r = 1; r <= 3; r++) {
      for (var c = 1; c <= 3; c++) {
        if (!squares[[r,c]]) {
          return [r,c]
        }
      }
    }
  },
  checkRows: function(squares) {
    var rows = {}
    for (var r = 1; r <= 3; r++) {
      rows[r] = [];
      for (var key in squares) {
        if (parseInt(key[0]) === r) {
          rows[r].push(parseInt(key[2]))
        }
      }
    }
    for (var key in rows) {
      if (rows[key].length === 2) {
        if (squares[[key,rows[key][0]]] === squares[[key,rows[key][1]]]) {
          if (squares[[key,rows[key][0]]] === "master") {
            var missingRow = this.findMissingCoord(rows[key])
            return [key, missingRow]
          } else {
            var tempKey = key
          }
        }
      }
    }
    if (tempKey) {
      var missingRow = this.findMissingCoord(rows[tempKey])
      return [tempKey, missingRow]
    }
  },
  checkColumns: function(squares) {
    var cols = {}
    for (var c = 1; c <= 3; c++) {
      cols[c] = [];
      for (var key in squares) {
        if (parseInt(key[2]) === c) {
          cols[c].push(parseInt(key[0]))
        }
      }
    }
    for (var key in cols) {
      if (cols[key].length === 2) {
        if (squares[[cols[key][0],key]] === squares[[cols[key][1],key]]) {
          if (squares[[cols[key][0],key]] === "master") {
            var missingRow = this.findMissingCoord(cols[key])
            return [missingRow, key]
          } else {
            var tempKey = key
          }
        }
      }
    }
    if (tempKey) {
      var missingRow = this.findMissingCoord(cols[tempKey])
      return [missingRow, tempKey]
    }
  },
  checkDangerCorners: function(squares) {
    var corners = this.corners();
    for (var i in corners) {
      if (squares[[2,2]] && squares[corners[i]] && !squares[this.oppositeCorner(corners[i])]) {
        return this.oppositeCorner(corners[i])
      }
    }
  },
  checkOppositeCorners: function(squares) {
    var corners = this.corners();
    for (var i in corners) {
      if (squares[corners[i]] && squares[corners[i]] === squares[this.oppositeCorner(corners[i])]) {
        return this.findOpenSide(squares)
      }
    }
  },
  checkDiagonals: function(squares) {
    var coords;
    if (squares[[2,2]]) {
      var corners = this.corners();
      for (var i in corners) {
        if (squares[corners[i]] === squares[[2,2]] && !squares[this.oppositeCorner(corners[i])]) {
          coords = this.oppositeCorner(corners[i]);
          return coords;
        }
      }
    } else {
      coords = [2,2]
    }
    return coords;
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
  sides: function() {
    arr = []
    for (var r = 1; r <= 3; r++) {
      for (var c = 1; c <= 3; c++) {
        if ((r % 2 === 0 || c % 2 === 0) && !(r % 2 === 0 && c % 2 === 0 )) {
          arr.push([r,c])
        }
      }
    }
    return arr;
  },

  oppositeCorner: function(coords) {
    return [4-coords[0], 4-coords[1]]
  },
  findOpenCorner: function(squares) {
    var coords;
    var corners = this.corners();
    for (var i in corners) {
      if (!squares[corners[i]]) {
        return corners[i]
      }
    }
  },
  findOpenSide: function(squares) {
    var coords;
    var sides = this.sides();
    for (var i in sides) {
      if (!squares[sides[i]]) {
        return sides[i]
      }
    }
  },
  findMissingCoord: function(arr) {
    return [1,2,3].filter(function(n) {
      return arr.indexOf(n) < 0
    })[0];
  },
}