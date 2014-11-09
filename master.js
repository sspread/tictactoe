function Master() {}

Master.prototype = {
  move: function(squares) {
    var rows = this.checkRows(squares)
    var columns = this.checkColumns(squares)
    var diagonals = this.checkDiagonals(squares)
    var openCorners = this.findOpenCorner(squares)
    var lastSquare = this.findLastSquare(squares)
    if (rows) {
      return rows
    } else if (columns) {
      return columns
    } else if (diagonals) {
      return diagonals
    } else if (openCorners) {
      return openCorners
    } else {
      return lastSquare
    }
  },

  findLastSquare: function(squares) {
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

  checkDiagonals: function(squares) {
    for (var key in squares) {
      if (key[0] % 2 !== 0 && key[2] % 2 !== 0) {
        if (squares[key] === squares[[2,2]] && !squares[[[4-key[0], 4-key[2]]]]) {
          return [4-key[0], 4-key[2]]
        } else if (!squares[[2,2]]) {
          return [2,2]
        }
      }
    }
  },

  findOpenCorner: function(squares) {
    for (var r = 1; r <= 3; r+=2) {
      for (var c = 1; c <= 3; c+=2) {
        if (!squares[[r,c]]) {
          return [r,c]
        }
      }
    }
  },

  findMissingCoord: function(arr) {
    return [1,2,3].filter(function(n) {
      return arr.indexOf(n) < 0
    })[0];
  },
}