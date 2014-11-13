$(function() {
  var board =  new Board()
  board.newSquares();
  var master = new Master(board)
  var boardView = new BoardView()
  boardView.renderNew();
  new Game({board: board, master: master, boardView: boardView}).play();
});