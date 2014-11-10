function BoardView() {
  var table = $.parseHTML("<table id = 'board'></table>")
  this.table = table[0]
  $("#game").append(table);
  for (var r = 1; r <= 3; r++) {
    $(table).append("<tr></tr>");
    for (var c = 1; c <= 3; c++) {
      var squareId = String(r)+String(c)
      $(table).children('tbody').children('tr:last-child').append('<td id = '+squareId+'></td>')
    }
  }
}

BoardView.prototype = {
  showPlayerMove: function(clicked) {
    $(clicked).html("<i class = 'player fa fa-times fa-3x'></i>");
  },
  showMasterMove: function(coords) {
    var square = $(this.table).find("#"+coords)
    $(square).html("<i class = 'master fa fa-circle-o fa-3x'></i>").fadeIn("slow");
  },
  showWinningLocation: function(params) {
    var board = this;
    var winningStripe = this.getWinningArr(params)
    $.each(winningStripe, function(index, value) {
      $(board.table).find("#"+value).addClass('win-cell');
    });
  },

  getWinningArr: function(params) {
    console.log(params)
    var arr = []
    var id
    if (params['orientation'] === 'row') {
      for (var i = 1; i <=3; i++) {
        id = params['number']+i
        arr.push(id)
      }
    } else if (params['orientation'] === 'col') {
      for (var i = 1; i <=3; i++) {
        id = i+params['number']
        arr.push(id)
      }
    }
    return arr
  },
  showWinner: function(winner) {
    var capitalizeWinner = winner.charAt(0).toUpperCase() + winner.slice(1);
    $("#game").append("<div class = 'winner'>"+capitalizeWinner+" wins!</div>")
  },
  
  showDraw: function() {
    $("#game").append("<div class = 'winner'> Draw!</div>")
  }
}