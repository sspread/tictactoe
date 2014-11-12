function BoardView() {
  this.el = $("#game")
}

BoardView.prototype = {
  renderNew: function() {
    var table, r, c, squareId;
    table = $.parseHTML("<table id = 'board'></table>")[0];
    this.el.html(table);
    for (r = 1; r <= 3; r++) {
      $(table).append("<tr></tr>");
      for (c = 1; c <= 3; c++) {
        squareId = String(r)+String(c);
        this.el.find('tr:last-child').append('<td id = '+squareId+'></td>');
      }
    }
  },
  showPlayerMove: function(clicked) {
    $(clicked).html("<i class = 'player fa fa-times fa-4x'></i>");
  },
  showMasterMove: function(coords) {
    var square = $(this.el).find("#"+coords);
    $(square).html("<i class = 'master fa fa-circle-o fa-4x'></i>");
  },
  showWinningLocation: function(params) {
    var board = this,
    winningStripe = this.getWinningArr(params);
    $.each(winningStripe, function(index, value) {
      $(board.el).find("#"+value).addClass('win-square');
    });
  },
  getWinningArr: function(params) {
    var type = params.orientation,
    place = params.number,
    arr = [], id, i;
    if (type === 'row') {
      for (i = 1; i <=3; i++) {
        id = place+i;
        arr.push(id);
      }
    } else if (type === 'col') {
      for (i = 1; i <=3; i++) {
        id = i+place;
        arr.push(id);
      }
    } else if (type === 'diag') {
      for (i = 1; i <=3; i++) {
        id = i+String(place+(i-1)*(2-place));
        arr.push(id);
      }
    }
    return arr;
  },
  showWinner: function(winner) {
    var capitalizeWinner = winner.charAt(0).toUpperCase() + winner.slice(1);
    $("#game").append("<div class = 'winner'>"+capitalizeWinner+" wins!</div>");
  },
  showDraw: function() {
    $("#game").append("<div class = 'winner'>Draw!</div>");
  },
  showPlayButton: function() {
    $(".winner").append("<div class = 'again'>Again?</div>");
  },
};