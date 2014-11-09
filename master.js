function Master() {

}

Master.prototype = {
  move: function(squares) {
    var rows = this.checkRows(squares)
    var columns = this.checkColumns(squares)
    var diagonals = this.checkDiagonals(squares)
    if (rows) {
      return rows
    } else if (columns) {
      return columns
    } else if (diagonals) {
      return diagonals
    } else {

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
      if (rows[r].length === 2 && squares[[r, rows[r][0]]] === squares[[r, rows[r][1]]]) {
        var missingCol = this.findMissingCoord(rows[r]);
        return [r, missingCol]
      }
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
        if (squares[[cols[key][0]],key] === squares[[cols[key][1]],key]) {
          if (squares[[key,cols[key][0]]] === "master") {
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




      // if (cols[c].length === 2 && squares[[cols[c][0], c]] === squares[[cols[c][1], c]]) {
      //   console.log("c- "+c)
      //   console.log("cols[c][0]- "+cols[c][1])
      //   console.log("squares[[cols[c][0], c]]- " + squares[[cols[c][1], c]])
      //   var missingRow = this.findMissingCoord(cols[c]);
      //   return [missingRow, c]
    // }
  },

  checkDiagonals: function(squares) {
    for (var key in squares) {
      if (key[0] % 2 !== 0 && key[2] % 2 !== 0) {
        if (squares[key] === squares[[2,2]]) {
          return [4-key[0], 4-key[2]]
        } else if (!squares[[2,2]]) {
          return [2,2]
        }
      }
    }
  },

  findMissingCoord: function(arr) {
    return [1,2,3].filter(function(n) {
      return arr.indexOf(n) < 0
    })[0];
  },

    checkIfMaster: function(value) {
    if (value == "master") {
      return true
    } else {
      return false
    }
  }
}