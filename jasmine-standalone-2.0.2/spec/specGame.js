describe("Game", function() {
  var board, maseter, boardView, game;
  board =  new Board()
  board.newSquares();
  master = new Master(board)
  boardView = new BoardView()
  boardView.renderNew();
  game = new Game({board: board, master: master, boardView: boardView})

  it("has a board model", function () {
    expect(game.board).toEqual(board)
  });
  it("has a view", function () {
    expect(game.boardView).toEqual(boardView)
  });
  it("has a master model", function () {
    expect(game.master).toEqual(master)
  });

  describe("movePlayer", function() {
    var click;
    jasmine.clock().install()
    click = $.Event("click", {delegateTarget: $("<td id ='12'></td>")[0] });
    beforeEach(function() {game.resetGame();})
    
    it("updates board to reflect move coordinates", function() {
      game.movePlayer(click)
      expect(game.board.squares[[1,2]]).toEqual('player');
    });
    it("checks for winner after executing", function() {
      spyOn(game, 'checkWinner');
      game.movePlayer(click)
      expect(game.checkWinner).toHaveBeenCalled();
    });
    it("triggers master move upon completion", function() {
      spyOn(game, 'moveMaster');
      game.movePlayer(click);
      jasmine.clock().tick(300)
      expect(game.moveMaster).toHaveBeenCalled();
    });
    it("does not update board coords again if square is occupied", function() {
      spyOn(game, 'checkWinner');
      game.board.squares[[1,2]] = 'master'
      game.movePlayer(click)
      expect(game.checkWinner).not.toHaveBeenCalled();
    });
  });

  describe('checkWinner', function() {
    beforeEach(function() {game.resetGame();})

    it('changes gameOver to true if there is a winner', function() {
      expect(game.gameOver).toEqual(false)
      game.board.squares[[1,1]] = 'master'
      game.board.squares[[1,3]] = 'player'
      game.board.squares[[2,1]] = 'player'
      game.board.squares[[2,2]] = 'master'
      game.board.squares[[3,2]] = 'player'
      game.board.squares[[3,3]] = 'master'
      game.moves = 6;
      game.checkWinner();
      expect(game.gameOver).toEqual(true)
    });
    it('changes gameOver to true if there is a draw', function() {
      expect(game.gameOver).toEqual(false)
      game.board.squares[[1,1]] = 'master'
      game.board.squares[[1,2]] = 'player'
      game.board.squares[[1,3]] = 'master'
      game.board.squares[[2,1]] = 'player'
      game.board.squares[[2,2]] = 'master'
      game.board.squares[[2,3]] = 'player'
      game.board.squares[[3,1]] = 'player'
      game.board.squares[[3,2]] = 'master'
      game.board.squares[[3,3]] = 'player'
      game.moves = 9
      game.checkWinner();
      expect(game.gameOver).toEqual(true)
    })
  });
});