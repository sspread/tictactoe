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
    console.log(this.boardView.el)
    var coords, squareEmpty;
    coords = this.coordsToArr(e.delegateTarget.id);
    squareEmpty = this.board.checkIfEmpty(coords);
    if (!this.gameOver && this.playerTurn && squareEmpty) {
      this.moves += 1;
      this.playerTurn = false;
      this.board.updateSquares(coords, "player");
      this.boardView.showPlayerMove(e.delegateTarget);
      this.checkWinner();
      setTimeout(function() {
        this.moveMaster();
      }.bind(this), 270);
    }
  },

  resetGame: function() {
    this.board.clearSquares();
    this.boardView.renderNew();
    this.playerTurn = true;
    this.gameOver = false;
    this.moves = 0;
    this.play();
  },
  moveMaster: function() {
    if (!this.gameOver) {
      var masterMoveCoords = this.master.move(this.board.squares).join('');
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
      this.gameOver = true;
      parsedLocation = this.parseLocation(winningLocation);
      winner = this.board.squares[parsedLocation];
      this.boardView.showWinner(winner);
      this.boardView.showWinningLocation(winningLocation);
      this.boardView.showPlayButton();
    } else if (this.moves >= 8) {
      this.executeDraw();
    }
  },
  executeDraw: function() {
    this.gameOver = true;
    this.boardView.showDraw();
    this.boardView.showPlayButton();    
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

  coordsToArr: function(coordsInt) {
    var arr = String(coordsInt).split('');
    return [parseInt(arr[0]), parseInt(arr[1])];
  }
};