$(function() {
  var board =  new Board()
  var master = new Master(board)
  var boardView = new BoardView()
  boardView.renderNew();
  new Game({board: board, master: master, boardView: boardView}).play();
});