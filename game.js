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
      // console.log(squareEmpty)
      if (game.playerTurn && !game.gameOver) {
        game.moves += 1;
        game.playerTurn = false;
        game.board.updateSquares(coords, "player")
        game.boardView.showPlayerMove(this);
        game.move();
      };
    });
  },

  move: function() {
    var masterMoveCoords = this.master.move(this.board.squares);
    if (masterMoveCoords) {masterMoveCoords = masterMoveCoords.join('')}
    this.board.updateSquares(this.coordsToArr(masterMoveCoords), "master")
    this.boardView.showMasterMove(masterMoveCoords);
    this.playerTurn = true;
  },

  checkWinner: function() {

  },

  coordsToArr: function(coordsInt) {
    var arr = String(coordsInt).split('')
    return [parseInt(arr[0]), parseInt(arr[1])]
  }



}
