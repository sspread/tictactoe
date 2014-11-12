function Game(components) {
  this.board = components.board;
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
      console.log(game.board.squares)
      var coords = game.coordsToArr(this.id);
      var squareEmpty = game.board.checkIfEmpty(coords);
      if (!game.gameOver && game.playerTurn && squareEmpty) {
        game.moves += 1;
        game.playerTurn = false;
        game.board.updateSquares(coords, "player");
        game.boardView.showPlayerMove(this);
        game.checkWinner();
        setTimeout(function() {
          game.moveMaster();
        }, 270);
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
    this.boardView.renderNew();
    this.board.clearSquares();
  },
  moveMaster: function() {
    if (!this.gameOver) {
      var masterMoveCoords = this.master.move(this.board.squares).join('');
      console.log(masterMoveCoords)
      this.board.updateSquares(this.coordsToArr(masterMoveCoords), "master");
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
      var parsedLocation = this.parseLocation(winningLocation);
      var winner = this.board.squares[parsedLocation];
      this.boardView.showWinner(winner);
      this.boardView.showWinningLocation(winningLocation);
      this.boardView.showPlayButton();
    } else if (this.moves >= 8) {
      this.gameOver = true;
      this.boardView.showDraw();
      this.boardView.showPlayButton();
    }
  },
  parseLocation: function(params) {
    var type = params.orientation;
    var place = params.number;
    if (type === 'row') {
      return [place, 1];
    } else if (type === 'col' || type === 'diag') {
      return [1, place];
    }
  },
  getWinningLocation: function() {
    if (this.moves > 4) {
      var players = ["master", "player"];
      var directions = [
        this.board.getWinningRow,
        this.board.getWinningColumn,
        this.board.getWinningDiagonal
      ];
      for (var i in directions) {
        if (directions[i].call(this.board, players)) {
          return directions[i].call(this.board, players);
        }
      }
    } else return false;
  },
  coordsToArr: function(coordsInt) {
    var arr = String(coordsInt).split('');
    return [parseInt(arr[0]), parseInt(arr[1])];
  }
};