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
    it('should return ')
  })
});