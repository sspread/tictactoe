describe("game", function() {
  var board =  new Board()
  board.newSquares();
  var master = new Master(board)
  var boardView = new BoardView()
  boardView.renderNew();
  var game = new Game({board: board, master: master, boardView: boardView})
  game.play();

  function MasterTest(board) {
    this.squares = board
    this.masterArray = [];
    this.gameCount = 0;
  }


  function TestGame() {
    this.squares = {
      '1,1': null,
      '1,2': null,
      '1,3': null,
      '2,1': null,
      '2,2': null,
      '2,3': null,
      '3,1': null,
      '3,2': null,
      '3,3': null
    };
    this.gameNumber = 0;
    this.winner = null;
    this.movesCount = 0;
  }
  TestGame.prototype = new Board();
  TestGame.prototype.constructor = Board;
  TestGame.prototype.getWinningLocation = function(players) {
    return Board.prototype.getWinningLocation.call(this, players)
  }

  MasterTest.prototype = {
  updateMasterArray: function(board, winner) {
    this.masterArray.push({game: this.gameCount, gameBoard: board, winner: winner});
  },

  gameLoop: function(testGame, playerMove) {
    var key, masterMoveCoords, winningLocation, winner, boardState;
    testGame.squares[playerMove] = "player";
    testGame.movesCount += 1;
   
    winningLocation = testGame.getWinningLocation(['player','master'])
    if (winningLocation) {
      this.treatWinner(testGame, winningLocation);
    } else if (testGame.movesCount > 8) {
      this.draw(testGame, winningLocation)
    }

    var master = new Master(testGame)
    masterMoveCoords = master.move();
    testGame.squares[masterMoveCoords] = "master";
    testGame.movesCount += 1;

    winningLocation = testGame.getWinningLocation(['player','master'])
      // console.log(winningLocation)
    if (winningLocation) {
      this.treatWinner(testGame, winningLocation);
    } else if (testGame.movesCount > 8) {
      this.draw(testGame, winningLocation)
    }
    this.gameCombos(testGame, i+=1);
  },

  treatWinner: function(testGame, winningLocation) {
      parsedLocation = game.parseLocation(winningLocation)
      winner = testGame.squares[parsedLocation];
      testGame.winner = winner;
      this.gameCount += 1;
      testGame.gameNumber = this.gameCount
      testCopy = $.extend(true, {}, testGame)
      this.masterArray.push(testCopy)
      testGame = new TestGame();
      this.gameCombos(testGame);
  }, 
  draw: function(testGame, winningLocation) {
    console.log("DRAW")
      this.gameCount += 1;
      testGame.gameNumber = this.gameCount
      testGame.winner = "draw";
      testCopy = $.extend(true, {}, testGame)
      this.masterArray.push(tesCopy)
      testGame = new TestGame();
      this.gameCombos(testGame);
  },
  gameCombos: function(testGame, i) {
    console.log(i)
    if (typeof(i)==='undefined') i = 0;
    if (i > 8) i = 0;
    if (this.gameCount > 10) return;
    var coords = Object.keys(testGame.squares);
    for (i; i < coords; i++) {
      if (testGame.squares[coords[i]] === null) {
        this.gameLoop(testGame, coords[i]);
        break
      }
    }
  this.gameCombos(testGame, i+=1);
  }
}

  describe("Master", function() {
    var masterTest = new MasterTest(board);
    var testGame = new TestGame();
    // console.log(board.squares)

    masterTest.gameCombos(testGame);
    console.log(masterTest.masterArray)
    // var badArr = []
    // masterTeset.masterArray
    // for (var run in masterTest.masterHash) {
      // console.log(masterHash[run])
    // }
    // for (var run in bigHash) {
      // console.log(bigHash[run])
    // }
    // console.log(bigHash)
    // console.log()

    // describe("move", function() {
    //   var move;
    //   beforeEach(function() {board.newSquares();})
    //   it("Returns center coords when player's first move is not center", function() {
    //     board.squares[[1,2]] = "player"
    //     move = master.move();
    //     expect(move).toEqual([2,2]);
    //   });
    //   it("Returns first corner coords when player's first move is center", function() {
    //     board.squares[[2,2]] = "player"
    //     move = master.move()
    //     expect(move).toEqual([1,1]);
    //   });
    //   it("Blocks player from taking row", function() {
    //     board.squares[[2,1]] = "player"
    //     board.squares[[2,2]] = "player"
    //     move = master.move()
    //     expect(move).toEqual([2,3]);
    //   });
    // });

  });
});