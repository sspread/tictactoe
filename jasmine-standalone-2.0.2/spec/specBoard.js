describe('Board', function() {
  board = new Board();
  
  it("has squares", function() {
    expect(board.squares).toBeDefined();
  });

  describe('newSquares', function() {
    it('should set squares to object containing null tic tac toe coordinates', function () {
      board.newSquares();
      expect(board.squares).toEqual({
      '1,1': null,
      '1,2': null,
      '1,3': null,
      '2,1': null,
      '2,2': null,
      '2,3': null,
      '3,1': null,
      '3,2': null,
      '3,3': null
      });
    });
  });

  describe('updateSquares', function() {
    it('should update squares', function() {
      expect(board.squares[[1,3]]).toEqual(null);
      board.updateSquares([1,3], 'player');
      expect(board.squares[[1,3]]).toEqual('player');
    });
  });

  describe('getWinningLocation', function() {
    beforeEach(function() {board.newSquares();})
    var players = ['player', 'master'];

    it('should return winning row array of coordinates', function() {
      board.squares[[1,1]] = 'master';
      board.squares[[1,2]] = 'master';
      board.squares[[1,3]] = 'master';
      board.squares[[2,2]] = 'player';
      expect(board.getWinningLocation(players)).toEqual([[1,1], [1,2], [1,3]]);
    });
    it('should return winning column array of coordinates', function() {
      board.squares[[1,2]] = 'master';
      board.squares[[2,2]] = 'master';
      board.squares[[3,2]] = 'master';
      board.squares[[2,3]] = 'player';
      expect(board.getWinningLocation(players)).toEqual([[1,2], [2,2], [3,2]]);
    });
    it('should return winning diagonal array of coordinates', function() {
      board.squares[[1,3]] = 'master';
      board.squares[[2,2]] = 'master';
      board.squares[[3,1]] = 'master';
      board.squares[[2,3]] = 'player';
      expect(board.getWinningLocation(players)).toEqual([[1,3], [2,2], [3,1]]);
    });
  });
});