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
    $(clicked).addClass('occupied')
  },
  showBeginMessage: function() {
    var messages, message, randindex;
    messages = [
      "Go ahead!",
      "Giddy up!",
      "After you!",
      "Good luck!",
      "You can do it!",
      "For the win!",
      "Go for it!",
      "You got this!"
    ];
    randindex = Math.floor(Math.random() * messages.length);
    message = messages[randindex]
    this.el.append("<div class = 'message'>" + message + "</div>");
  },
  hideBeginMessage: function() {
    this.el.find('.message').remove();
  },
  showMasterMove: function(coords) {
    var square = $(this.el).find("#"+coords);
    $(square).html("<i class = 'master fa fa-circle-o fa-4x'></i>");
    $(square).addClass('occupied')
  },
  showWinningLocation: function(winningArr) {
    var id, board = this;
    $.each(winningArr, function(index, value) {
      id = '#'+value.join('');
      $(board.el).find(id).addClass('win-square');
    });
  },
  showWinner: function(winner) {
    var capitalizeWinner = winner.charAt(0).toUpperCase() + winner.slice(1);
    this.el.find('td').addClass('over')
    this.el.append("<div class = 'message'>"+capitalizeWinner+" wins!</div>");
  },
  showDraw: function() {
    this.el.find('td').addClass('over')
    this.el.append("<div class = 'message'>Draw!</div>");
  },
  showPlayButton: function() {
    this.el.find(".message").append("<div class = 'again'>Again?</div>");
  },
};