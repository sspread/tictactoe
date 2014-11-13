describe("master", function() {

  function MasterTest(board) {
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
      game.movesCount += 1;
      this.main(game)
    },
    iterateOpenSquares: function(openSquares, game) {
      var i, copyBoard, newGame, copies = [];
      for (i = 0; i < openSquares.length; i++) {
        newGame = new TestGame();
        newGame = this.movePlayerToCoord(game, newGame, openSquares[i])
        copies.push(newGame)
      }
      return copies
    },
    movePlayerToCoord: function(game, newGame, coord) {
      copyBoard = $.extend(true, {}, game.squares)
      newGame.squares = copyBoard
      newGame.squares[coord] = 'player'
      newGame.movesCount = game.movesCount
      newGame.movesCount += 1;
      return newGame
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
        this.gameCount +=1
        parsedLocation = this.parseLocation(winningLocation);
        game.winner = game.squares[parsedLocation];
        this.finishedGames.push(game);
        return true
      } else if (game.movesCount > 8) {
        this.gameCount +=1;
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

  var masterTest = new MasterTest();
  var testGame = new TestGame();
  testGame.newSquares()
  // var testGameSquares = {
    // '1,1': 'master',
    // '1,2': null,
    // '1,3': null,
    // '2,1': 'player',
    // '2,2': 'master',
    // '2,3': null,
    // '3,1': 'player',
    // '3,2': 'master',
    // '3,3': 'player'
  // }
  // testGame.movesCount = 6;
  // testGame.squares = testGameSquares;

  // console.dir(masterTest.finishedGames)
    masterTest.main(testGame)



  it("should never lose given all combinations of player moves", function() {


  });


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