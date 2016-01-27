var Player = function (shapey) {
  this.shapey = shapey;
  this.score = 0;
};

Player.prototype.mark = function () {
  return this.shapey;
};

var Space = function (x, y) {
  this.x = x; // Didn't end up using, can be removed.
  this.y = y; // Didn't end up using, can be removed.
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
  var arr1 = [];

  for (var i = 0; i < 3; i++) {
    var arr2 = [];
    for (var j = 0; j < 3; j++) {
      var space = new Space(i, j);
      arr2.push(space);
    }
    arr1.push(arr2);
  }
  return arr1;
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

//TODO: add player score
Game.prototype.checkState = function() {
  var ret = false;
  if (this.board) {
    if(this.board[0][0].mark === this.board[0][1].mark && this.board[0][0].mark === this.board[0][2].mark) {
      ret = this.board[0][0].mark;
    }
    if(this.board[1][0].mark === this.board[1][1].mark && this.board[1][0].mark === this.board[1][2].mark) {
      console.log(this.board[1][0]);
      ret = this.board[1][0].mark;
    }
    if(this.board[2][0].mark === this.board[2][1].mark && this.board[2][0].mark === this.board[2][2].mark) {
      console.log(this.board[1][0]);
      ret = this.board[2][0].mark;
    }

    if(this.board[0][0].mark === this.board[1][0].mark && this.board[0][0].mark === this.board[2][0].mark) {
      console.log(this.board[1][0]);
      ret = this.board[2][0].mark;
    }
    if(this.board[0][1].mark === this.board[1][1].mark && this.board[0][1].mark === this.board[2][1].mark) {
      console.log(this.board[1][0]);
      ret = this.board[2][0].mark;
    }
    if(this.board[0][2].mark === this.board[1][2].mark && this.board[0][2].mark === this.board[2][2].mark) {
      console.log(this.board[1][0]);
      ret = this.board[2][0].mark;
    }

    if(this.board[0][0].mark === this.board[1][1].mark && this.board[0][0].mark === this.board[2][2].mark) {
      console.log(this.board[1][0]);
      ret = this.board[2][0].mark;
    }
    if(this.board[0][2].mark === this.board[1][1].mark && this.board[0][2].mark === this.board[2][0].mark) {
      console.log(this.board[1][0]);
      ret = this.board[2][0].mark;
    }
  }
  return ret;
};
