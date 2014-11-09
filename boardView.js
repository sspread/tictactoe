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

BoardView.prototype.showPlayerMove = function(clicked) {
  $(clicked).html("<i class = 'player fa fa-times fa-3x'></i>");
}

BoardView.prototype.showMasterMove = function(coords) {
  var square = $(this.table).find("#"+coords)
  $(square).html("<i class = 'master fa fa-circle-o fa-3x'></i>");
}