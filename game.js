function Game(components) {
  this.board = components.board;
  this.player = components.player;
  this.master = components.master;
  this.boardView = components.boardView;
  this.playerTurn = true;
  this.gameOver = false;
  this.moves = 0;
}

Game.prototype = {
  play: function() {
    var game = this;
    $("#game").on('click', 'td', function() {
      var coords = game.coordsToArr(this.id);
      var squareEmpty = game.board.checkIfEmpty(coords);
      if (!game.gameOver && game.playerTurn && squareEmpty) {
        game.moves += 1;
        game.playerTurn = false;
        game.board.updateSquares(coords, "player")
        game.boardView.showPlayerMove(this);
        game.checkWinner();
        setTimeout(function() {game.moveMaster()}, 270);
      }
    });
    $("#game").on('click', '.again', function() {
      game.resetGame();
    });
  },
  resetGame: function() {
    this.playerTurn = true;
    this.gameOver = false;
    this.moves = 0;
    this.boardView.clearBoard();
    this.board.clearSquares();
  },

  moveMaster: function() {
    if (!this.gameOver) {
      var masterMoveCoords = this.master.move(this.board.squares).join('');
      this.board.updateSquares(this.coordsToArr(masterMoveCoords), "master")
      this.boardView.showMasterMove(masterMoveCoords);
      this.moves += 1;
      this.checkWinner();
    }
    this.playerTurn = true;
  },

  checkWinner: function() {
    var winningLocation = this.getWinningLocation();
    if (winningLocation) {
      this.gameOver = true;
      parsedLocation = this.parseLocation(winningLocation)
      var winner = this.board.squares[parsedLocation]
      this.boardView.showWinner(winner)
      this.boardView.showWinningLocation(winningLocation)
      this.boardView.showPlayButton();
    } else if (this.moves >= 8) {
      this.gameOver = true;
      this.boardView.showDraw();
      this.boardView.showPlayButton();
    }
  },

  parseLocation: function(params) {
    var type = params['orientation']
    var place = params['number']
    if (type === 'row') {
      return [place, 1]
    } else if (type === 'col' || type === 'diag') {
      return [1, place]
    }

  },
  getWinningLocation: function() {
    if (this.moves > 4) {
      var players = ["master", "player"]
      var row = this.getWinningRow(players)
      var column = this.getWinningColumn(players)
      var diagonal = this.getWinningDiagonal(players) 
      if (row) {
        return row
      } else if (column) {
        return column
      } else if (diagonal) {
        return diagonal
      }
    } else return false
  },
  getWinningRow: function(players) {
    for (var i in players) {
      var squares = this.board.squares
      var rows = {}
      for (var r = 1; r <= 3; r++) {
        rows[r] = [];
        for (var key in squares) {
          if (parseInt(key[0]) === r && squares[key] === players[i]) {
            rows[r].push(parseInt(key[2]))
          }
        }
        for (key in rows) {
          if (rows[key].length === 3) {
            return {orientation: 'row', number: key}
          }
        }
      }
    }
    return false;
  },
  getWinningColumn: function(players) {
    for (var i in players) {
      var squares = this.board.squares
      var cols = {}
      for (var c = 1; c <= 3; c++) {
        cols[c] = [];
        for (var key in squares) {
          if (parseInt(key[2]) === c && squares[key] === players[i]) {
            cols[c].push(parseInt(key[0]))
          }
        }
        for (key in cols) {
          if (cols[key].length === 3) {
            return {orientation: 'col', number: key}
          }
        }
      }
    }
    return false;
  },
  getWinningDiagonal: function(players) {
    for (var i in players) {
      var squares = this.board.squares
      if (!squares[[2,2]]) {
        return false;
      } else {
        var corners = this.corners();
        for (var i in corners.slice(0,2)) {
          if (squares[[2,2]] === squares[corners[i]] && squares[[2,2]] === squares[this.oppositeCorner(corners[i])]) {
            return {orientation: 'diag', number: corners[i][1]}
          }
        }      
      }
    }
    return false;
  },
  oppositeCorner: function(coords) {
    return [4-coords[0], 4-coords[1]]
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
  coordsToArr: function(coordsInt) {
    var arr = String(coordsInt).split('')
    return [parseInt(arr[0]), parseInt(arr[1])]
  }
}
