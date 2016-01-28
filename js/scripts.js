var Player = function (shape) {
  this.shape = shape;
  this.score = 0;
};

Player.prototype.mark = function () {
  return this.shape;
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
//TODO: make checkState prototype
//TODO: make the checkState add player score
// TODO: make function that determines who's turn it is and returns the player whose turn it is.

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
    if(this.board[0][2].mark === this.board[1][1].mark && this.board[0][2].mark === this.board[2][2].mark) {
      console.log(this.board[1][0]);
      ret = this.board[2][0].mark;
    }
  }
  return ret;
};

// Game.prototype.checkState =  function() {
//   if (this.board) {
//     console.log(this.board);
//     for (var i = 0; i < this.board.length; i++) {
//       console.log(i);
//       //console.log(this.board[i][0].mark);
//       if((this.board[i][0].mark === this.board[i][1].mark) && (this.board[i][0].mark === this.board[i][2].mark) && (this.board[i][0].mark!="undefined")) {
//         console.log(this.board[i][0].mark.shape);
//         return this.board[i][0].mark.shape;
//       } else if((this.board[0][i].mark.shape === this.board[1][i].mark) && (this.board[0][i].mark === this.board[2][i].mark) && (this.board[0][i].mark!="undefined")) {
//         console.log("this.board");
//         return this.board[i][0].mark;
//       } else {
//         console.log("last");
//       }
//     }
//   }
// };

//UI logic below
$(document).ready(function () {
  var game = new Game();

  $(".topLeft").click(function (){
    game.board[0][0].markedBy(game.getPlayerByTurn());
  });

  $(".topMiddle").click(function (){
    game.board[0][1].markedBy(game.getPlayerByTurn());
  });

  $(".topRight").click(function (){
    game.board[0][2].markedBy(game.getPlayerByTurn());
  });

  $(".middleLeft").click(function (){
    game.board[1][0].markedBy(game.getPlayerByTurn());
  });

  $(".middleMiddle").click(function (){
    game.board[1][1].markedBy(game.getPlayerByTurn());
  });

  $(".middleRight").click(function (){
    game.board[1][2].markedBy(game.getPlayerByTurn());
  });

  $(".bottomLeft").click(function (){
    game.board[2][0].markedBy(game.getPlayerByTurn());
  });

  $(".bottomMiddle").click(function (){
    game.board[2][1].markedBy(game.getPlayerByTurn());
  });

  $(".bottomRight").click(function (){
    game.board[2][2].markedBy(game.getPlayerByTurn());
  });

  $("form#players").submit(function(event) {
    event.preventDefault();
    debugger;
    var inputtedPlayers = parseInt($("#playersAmount").val());

    game.makePlayers(inputtedPlayers);
    game.makeBoard();





  });
});
