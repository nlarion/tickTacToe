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
  //change turn here

  // this.checkState();//checkState after each new mark
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
  this.playerTurn = Math.floor((Math.random()*2)+1);
};

Game.prototype.makeBoard = function () {
  this.board = new Board();
  return this.board;
};

Game.prototype.makePlayers = function (players) {
  if(players === 1){
    this.player1 = new Player("X");
    //where we would put computer
  } else if (players === 2) {
    this.player1 = new Player("X");
    this.player2 = new Player("O");
  }
};

Game.prototype.returnPlayerAndChangeTurn = function () {
  if(this.playerTurn === 1 ){
    this.playerTurn = 2;
    return this.player1;
  } else {
    this.playerTurn = 1;
    return this.player2;
  }
};

//TODO: make the checkState add player score

Game.prototype.checkState = function() {
  var ret = false;
  if (this.board) {
    if(this.board[0][0].mark != undefined && this.board[0][0].mark === this.board[0][1].mark && this.board[0][0].mark === this.board[0][2].mark) {
      console.log(this.board[0][0].mark);
      ret = this.board[0][0].mark;
    }
    if(this.board[1][0].mark != undefined && this.board[1][0].mark === this.board[1][1].mark && this.board[1][0].mark === this.board[1][2].mark) {
      console.log(this.board[1][0].mark);
      ret = this.board[1][0].mark;
    }
    if(this.board[2][0].mark != undefined && this.board[2][0].mark === this.board[2][1].mark && this.board[2][0].mark === this.board[2][2].mark) {
      console.log(this.board[2][0].mark);
      ret = this.board[2][0].mark;
    }

    if(this.board[0][0].mark != undefined && this.board[0][0].mark === this.board[1][0].mark && this.board[0][0].mark === this.board[2][0].mark) {
      console.log(this.board[0][0].mark);
      ret = this.board[0][0].mark;
    }
    if(this.board[0][1].mark != undefined && this.board[0][1].mark === this.board[1][1].mark && this.board[0][1].mark === this.board[2][1].mark) {
      console.log(this.board[0][1].mark);
      ret = this.board[0][1].mark;
    }
    if(this.board[0][2].mark != undefined && this.board[0][2].mark === this.board[1][2].mark && this.board[0][2].mark === this.board[2][2].mark) {
      console.log(this.board[0][2].mark);
      ret = this.board[0][2].mark;
    }

    if(this.board[0][0].mark != undefined && this.board[0][0].mark === this.board[1][1].mark && this.board[0][0].mark === this.board[2][2].mark) {
      console.log(this.board[2][0].mark);
      ret = this.board[2][0].mark;
    }
    if(this.board[0][2].mark != undefined && this.board[0][2].mark === this.board[1][1].mark && this.board[0][2].mark === this.board[2][2].mark) {
      console.log(this.board[2][0].mark);
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
//       if((this.board[i][0].mark === this.board[i][1].mark) && (this.board[i][0].mark === this.board[i][2].mark) && (this.board[i][0].mark!=undefined)) {
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
  function clearBoard(){
    $(".topMiddle").text("");
    $(".topRight").text("");
    $(".topLeft").text("");
    $(".middleMiddle").text("");
    $(".middleRight").text("");
    $(".middleLeft").text("");
    $(".bottomMiddle").text("");
    $(".bottomRight").text("");
    $(".bottomLeft").text("");
  }
  var game = new Game();

  $("form#players").submit(function(event) {
    event.preventDefault();
    $(".gameContainer").fadeIn(800);
    // debugger;
    var inputtedPlayers = parseInt($("#playersAmount").val());
    clearBoard();
    console.log(game);
    game.makePlayers(inputtedPlayers);
    game.makeBoard();
  });

  $(".topLeft").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[0][0].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });
  $(".topMiddle").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[0][1].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });

  $(".topRight").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[0][2].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });

  $(".middleLeft").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[1][0].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });

  $(".middleMiddle").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[1][1].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });

  $(".middleRight").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[1][2].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });

  $(".bottomLeft").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[2][0].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });

  $(".bottomMiddle").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[2][1].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });

  $(".bottomRight").click(function (){
    var player = game.returnPlayerAndChangeTurn();
    game.board[2][2].markedBy(player);
    console.log(player.shape);
    game.checkState();
    $(this).text(player.shape);
  });
});
