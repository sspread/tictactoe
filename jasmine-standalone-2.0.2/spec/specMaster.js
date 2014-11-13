describe("Master", function() {
  it("should never lose given all combinations of player moves", function() {

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
    
    function MasterTest() {
      this.finishedGames = [];
      this.gameCount = 0;
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
      },
      parseFinishedGames: function() {
        var breakdown = {}, master = [], player = [], draw = [], game;
        for (game in this.finishedGames) {
          switch (this.finishedGames[game].winner) {
            case "master":
              master.push(this.finishedGames[game]);
              break;
            case "player":
              player.push(this.finishedGames[game]);
              break;
            case "draw":
              draw.push(this.finishedGames[game]);
              break; 
          }
        }
        breakdown.master = master
        breakdown.player = player
        breakdown.draw = draw
        return breakdown
      }
    }

  var masterTest, testGame, results;
  masterTest = new MasterTest();
  testGame = new TestGame();
  testGame.newSquares();
  masterTest.main(testGame)
  results = masterTest.parseFinishedGames();
  // console.dir(results)
  expect(results.player.length).toEqual(0);

  });

  describe("move", function() {
    var move, board, master;
    board = new Board();
    master = new Master(board);
    board.newSquares();
    beforeEach(function() {board.newSquares();})
    it("returns center coords when player's first move is not center", function() {
      board.squares[[1,2]] = "player"
      move = master.move();
      expect(move).toEqual([2,2]);
    });
    it("returns first corner coords when player's first move is center", function() {
      board.squares[[2,2]] = "player"
      move = master.move()
      expect(move).toEqual([1,1]);
    });
    it("blocks player from taking row", function() {
      board.squares[[2,1]] = "player"
      board.squares[[2,2]] = "player"
      move = master.move()
      expect(move).toEqual([2,3]);
    });
    it("blocks player from taking column", function() {
      board.squares[[1,1]] = "player"
      board.squares[[2,1]] = "player"
      move = master.move()
      expect(move).toEqual([3,1]);
    });
    it("blocks player from taking diagonal", function() {
      board.squares[[3,1]] = "player"
      board.squares[[2,2]] = "player"
      move = master.move()
      expect(move).toEqual([1,3]);
    });
    it("takes correct corner to avoid trap", function() {
      board.squares[[2,3]] = "player"
      board.squares[[3,2]] = "player"
      board.squares[[2,2]] = "master"
      move = master.move()
      expect(move).toEqual([1,3]);
    });
    it("correctly takes a side to avoid opposite corners trap", function() {
      board.squares[[1,3]] = "player"
      board.squares[[3,1]] = "player"
      board.squares[[2,2]] = "master"
      move = master.move()
      expect(move).toEqual([1,2]);
    });
    it("correctly skips block and goes for win if available", function() {
      board.squares[[1,1]] = "player"
      board.squares[[1,3]] = "player"
      board.squares[[2,2]] = "master"
      board.squares[[1,2]] = "master"
      board.squares[[3,1]] = "player"
      move = master.move()
      expect(move).toEqual([3,2]);
    });
  });
});