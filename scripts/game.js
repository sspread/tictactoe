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
    this.boardView.el.find('td').on('click', this.movePlayer.bind(this));
    this.boardView.el.on('click', '.again', this.resetGame.bind(this));
  },
  movePlayer: function(e) {
    var coords, squareEmpty;
    coords = this.coordsToArr(e.delegateTarget.id);
    squareEmpty = this.board.checkIfEmpty(coords);
    if (!this.gameOver && this.playerTurn && squareEmpty) {
      this.boardView.hideBeginMessage();
      this.moves += 1;
      this.playerTurn = false;
      this.board.updateSquares(coords, "player");
      this.boardView.showPlayerMove(e.delegateTarget);
      this.checkWinner();
      setTimeout(function() {
        this.moveMaster();
      }.bind(this), 130);
    }
  },
  resetGame: function() {
    this.board.newSquares();
    this.boardView.renderNew();
    this.boardView.showBeginMessage();
    this.playerTurn = true;
    this.gameOver = false;
    this.moves = 0;
    this.play();
  },
  moveMaster: function() {
    if (!this.gameOver) {
      var masterMoveCoords = this.master.move().join('');
      this.board.updateSquares(this.coordsToArr(masterMoveCoords), "master");
      this.boardView.showMasterMove(masterMoveCoords);
      this.moves += 1;
      this.checkWinner();
    }
    this.playerTurn = true;
  },
  checkWinner: function() {
    var winningLocation, parsedLocation, winner;
    players = ["master", "player"];
    if (this.moves > 4) {
      winningLocation = this.board.getWinningLocation(players);
    }
    if (winningLocation) {
      this.treatWinner(winningLocation);
    } else if (this.moves >= 9) {
      this.executeDraw();
    }
  },
  treatWinner: function(winningLocation) {
    this.gameOver = true;
    winner = this.board.squares[winningLocation[0]];
    this.boardView.showWinner(winner);
    this.boardView.showWinningLocation(winningLocation);
    this.boardView.showPlayButton();
  },
  executeDraw: function() {
    this.gameOver = true;
    this.boardView.showDraw();
    this.boardView.showPlayButton();    
  },
  coordsToArr: function(coordsInt) {
    var arr = String(coordsInt).split('');
    return [parseInt(arr[0]), parseInt(arr[1])];
  }
};