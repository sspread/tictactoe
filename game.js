function Game(components) {
  this.board = components.board;
  this.player = components.player;
  this.master = components.master;
  this.boardView = components.boardView;
  // this.playerTurn = true;
  this.gameOver = false;
  this.moves = 0;
}

Game.prototype = {
  play: function() {
    var game = this;
    $("#game").on('click', 'td', function() {
      var coords = game.coordsToArr(this.id);
      var squareEmpty = game.board.checkIfEmpty(coords);
      if (!game.gameOver && squareEmpty) {
        game.moves += 1;
        // game.playerTurn = false;
        game.board.updateSquares(coords, "player")
        game.boardView.showPlayerMove(this);
        game.checkWinner();
        game.moveMaster();
      }
    });
  },

  moveMaster: function() {
    if (!this.gameOver) {
      var masterMoveCoords = this.master.move(this.board.squares).join('');
      this.board.updateSquares(this.coordsToArr(masterMoveCoords), "master")
      this.boardView.showMasterMove(masterMoveCoords);
      this.moves += 1;
      this.checkWinner();
    }
    // this.playerTurn = true;
  },

  checkWinner: function() {
    var winningLocation = this.getWinningLocation();
    if (winningLocation) {
      this.gameOver = true;
      parsedLocation = this.parseLocation(winningLocation)
      var winner = this.board.squares[parsedLocation]
      // console.log(winner)
      this.boardView.showWinner(winner)
      this.boardView.showWinningLocation(winningLocation)
    } else if (this.moves >= 8) {
      this.gameOver = true;
      this.boardView.showDraw();
    }
  },

  parseLocation: function(params) {
    if (params['orientation'] === 'row') {
      return [params['number'], 1]
    } else if (params['orientation'] === 'col') {
      return [1, params['number']]
    }

  },

  getWinningLocation: function() {
    if (this.moves > 4) {
      var masterRow = this.getWinningRow("master")
      var playerRow = this.getWinningRow("player")
      var masterColumn = this.getWinningColumn("master")
      var playerColumn = this.getWinningColumn("player") 
      var masterDiagonal = this.getWinningDiagonal("master") 
      var playerDiagonal = this.getWinningDiagonal("player") 
      if (masterRow) {
        return masterRow
      } else if (playerRow) {
        return playerRow
      } else if (masterColumn) {
        return masterColumn
      } else if (playerColumn) {
        return playerColumn
      } else if (masterDiagonal) {
        return masterDiagonal
      } else if (playerDiagonal) {
        return playerDiagonal
      }
    } else {
      return false
    }
  },

  getWinningRow: function(player) {
    var squares = this.board.squares
    var rows = {}
    for (var r = 1; r <= 3; r++) {
      rows[r] = [];
      for (var key in squares) {
        if (parseInt(key[0]) === r && squares[key] === player) {
          rows[r].push(parseInt(key[2]))
        }
      }
      for (key in rows) {
        if (rows[key].length === 3) {
          return {orientation: 'row', number: key}
        }
      }
    }
    return false;
  },

  getWinningColumn: function(player) {
    var squares = this.board.squares
    var cols = {}
    for (var c = 1; c <= 3; c++) {
      cols[c] = [];
      for (var key in squares) {
        if (parseInt(key[2]) === c && squares[key] === player) {
          cols[c].push(parseInt(key[0]))
        }
      }
      for (key in cols) {
        if (cols[key].length === 3) {
          return {orientation: 'col', number: key}
        }
      }
    }
    return false;
  },

  getWinningDiagonal: function(player) {

  },

  coordsToArr: function(coordsInt) {
    var arr = String(coordsInt).split('')
    return [parseInt(arr[0]), parseInt(arr[1])]
  }



}
