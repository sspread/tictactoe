$(function() {
  var gameComponents = {
    board: new Board(),
    player: new Player(),
    master: new Master(),
    boardView: new BoardView()
  }
  var game = new Game(gameComponents);
  game.play();
});