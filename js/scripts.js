var Player = function (shape) {
  this.shape = shape;
  this.score = 0;
};

Player.prototype.mark = function () {
  return this.shape;
};

var Space = function (x, y) {
  this.x = x;
  this.y = y;
  this.mark;
};

Space.prototype.markedBy = function (player) {
  if(player){
    this.mark = player;
  }else if (this.mark) {
    return this.mark;
  }else{
    return false;
  }
};

var Board = function() {
  var array = [];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var space = new Space(i, j);
      array.push(space);
    }
  }
  return array;
}

var Game = function () {
  this.level = 0;
};

Game.prototype.makeBoard = function () {
  this.board = new Board();
  return this.board;
};

Game.prototype.makePlayers = function (players) {
  if(players === 1){
    this.player1 = new Player("X");
  } else if (players === 2) {
    this.player1 = new Player("X");
    this.player2 = new Player("O");
  }
};
