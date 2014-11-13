describe("master", function() {
  var board =  new Board()
  board.newSquares();
  var master = new Master(board)

  function MasterTest(board) {
    // this.squares = board
    this.finishedGames = [];
    this.gameCount = 0;
  }

  function TestGame() {
    this.winner = null;
    this.movesCount = 0;
  }
  TestGame.prototype = new Board();
  TestGame.prototype.constructor = Board;
  TestGame.prototype.getWinningLocation = function(players) {
    return Board.prototype.getWinningLocation.call(this, players)
  }
  TestGame.prototype.newSquares = function() {
    Board.prototype.newSquares.call(this)
  }

  MasterTest.prototype = {
    main: function(game) {
      this.gameCount = this.finishedGames.length
      if (this.gameCount.length > 10) return;
      var gameFinished, openSquares, copies = [];
      gameFinished = this.checkStatus(game)
      if (!gameFinished) {
        openSquares = this.getOpenSquares(game)
      } else {
        return;
      }
      copies = this.iterateOpenSquares(openSquares, game);
      this.processCopies(copies);
    },
    processCopies: function(games) {
      var i, gameFinished;
      for (i = 0; i < games.length; i++) {
        gameFinished = this.checkStatus(games[i])
        if (!gameFinished) {
          this.createNewMaster(games[i])
        } else {
          return
        }
      }
    },
    createNewMaster: function(game) {
      var copyBoard, newMaster, newBoard;
      copyBoard = $.extend(true, {}, game.squares)
      newBoard = new Board();
      newBoard.squares = copyBoard;
      newMaster = new Master(newBoard);
      this.moveMaster(game, newMaster)
    },
    moveMaster: function(game, master) {
      var masterMoveCoords;
      masterMoveCoords = master.move()
      game.squares[masterMoveCoords] = "master"
      this.main(game)
    },
    iterateOpenSquares: function(openSquares, game) {
      var i, copyBoard, newGame, copies = [];
      for (i = 0; i < openSquares.length; i++) {
        newGame = new TestGame();
        newGame = this.movePlayerToCoord(newGame, openSquares[i])
        copies.push(newGame)
      }
      return copies
    },
    movePlayerToCoord: function(game, coord) {
      copyBoard = $.extend(true, {}, game.squares)
      game.squares = copyBoard
      game.squares[coord] = 'player'
      game.movesCount += 1;
      return game
    },
    getOpenSquares: function(game) {
      var openSquares = [], coords;
      for (coords in game.squares) {
        if (game.squares[coords] === null) {
          openSquares.push(coords);
        }
      }
      return openSquares;
    },
    checkStatus: function(game) {
      var winningLocation, parsedLocation;
      winningLocation = game.getWinningLocation(["player", "master"]);
      if (winningLocation) {
        parsedLocation = this.parseLocation(winningLocation);
        game.winner = game.squares[parsedLocation];
        this.finishedGames.push(game);
        return true
      } else if (game.movesCount > 8) {
        game.winner = "draw";
        this.finishedGames.push(game);
        return true
      }
      return false
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
  }





  // testCopy = $.extend(true, {}, testGame)
  describe("Master", function() {
    var masterTest = new MasterTest();
    var testGame = new TestGame();
    testGame.newSquares()
    masterTest.main(testGame)
    console.log(masterTest.finishedGames)

    // console.log(masterTest.games)
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