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

Game.prototype.returnPlayerAndChangeTurn = function (space) {
  if (!space.mark) {
    if(this.playerTurn === 1 ){
      this.playerTurn = 2;
      return this.player1;
    } else {
      this.playerTurn = 1;
      return this.player2;
    }
  } else {
    return space.mark;
  }
};

//TODO: make the checkState add player score

Game.prototype.winState = function(player) {
  player.score += 1;
    console.log(player);
  return true;
}

Game.prototype.checkState = function() {
  var ret = false;
  if (this.board) {
    if(this.board[0][0].mark != undefined && this.board[0][0].mark === this.board[0][1].mark && this.board[0][0].mark === this.board[0][2].mark) {
      this.winState(this.board[0][0].mark);
      return "win";
    }
    if(this.board[1][0].mark != undefined && this.board[1][0].mark === this.board[1][1].mark && this.board[1][0].mark === this.board[1][2].mark) {
      this.winState(this.board[1][0].mark);
      return "win";
    }
    if(this.board[2][0].mark != undefined && this.board[2][0].mark === this.board[2][1].mark && this.board[2][0].mark === this.board[2][2].mark) {
      this.winState(this.board[2][0].mark);
      return "win";
    }

    if(this.board[0][0].mark != undefined && this.board[0][0].mark === this.board[1][0].mark && this.board[0][0].mark === this.board[2][0].mark) {
      this.winState(this.board[0][0].mark);
      return "win";
    }
    if(this.board[0][1].mark != undefined && this.board[0][1].mark === this.board[1][1].mark && this.board[0][1].mark === this.board[2][1].mark) {
      this.winState(this.board[0][1].mark);
      return "win";
    }
    if(this.board[0][2].mark != undefined && this.board[0][2].mark === this.board[1][2].mark && this.board[0][2].mark === this.board[2][2].mark) {
      this.winState(this.board[0][2].mark);
      return "win";
    }

    if(this.board[0][0].mark != undefined && this.board[0][0].mark === this.board[1][1].mark && this.board[0][0].mark === this.board[2][2].mark) {
      this.winState(this.board[2][2].mark);
      return "win";
    }
    if(this.board[0][2].mark != undefined && this.board[0][2].mark === this.board[1][1].mark && this.board[0][2].mark === this.board[2][0].mark) {
      this.winState(this.board[2][0].mark);
      return "win";
    }
    var funtimes = 0;
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j].mark!=undefined){
          funtimes ++;
        }
      }
    }
    if (funtimes === 9){
      return "cats";
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
  var game = new Game();
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

  function updateDisplay(){
    $("#player1Score").text(game.player1.score);
    $("#player2Score").text(game.player2.score);
    if(game.playerTurn===1){
      $("#character1").text(game.player1.shape+" <-- turn");
      $("#character2").text(game.player2.shape);
    } else if (game.playerTurn === 2){
      $("#character1").text(game.player1.shape);
      $("#character2").text(game.player2.shape+" <-- turn");
    }
  }

  $("form#players").submit(function(event) {
    event.preventDefault();
    $(".gameContainer").fadeIn(800);
    // debugger;
    var inputtedPlayers = parseInt($("#playersAmount").val());
    clearBoard();
    console.log(game);
    game.makePlayers(inputtedPlayers);
    game.makeBoard();
    updateDisplay();
  });

  $(".topLeft").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[0][0]);
    game.board[0][0].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState() === "win"){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState()==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });
  $(".topMiddle").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[0][1]);
    game.board[0][1].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState() === "win"){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState()==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });

  $(".topRight").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[0][2]);
    game.board[0][2].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState()=== "win"){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState()==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });

  $(".middleLeft").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[1][0]);
    game.board[1][0].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState()){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState()==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });

  $(".middleMiddle").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[1][1]);
    game.board[1][1].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState() === "win"){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState()==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });

  $(".middleRight").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[1][2]);
    game.board[1][2].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState() === "win"){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState()==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });

  $(".bottomLeft").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[2][0]);
    game.board[2][0].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState() === "win"){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState()==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });

  $(".bottomMiddle").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[2][1]);
    game.board[2][1].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState()=== "win"){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState() ==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });

  $(".bottomRight").click(function (){
    var player = game.returnPlayerAndChangeTurn(game.board[2][2]);
    game.board[2][2].markedBy(player);
    console.log(player.shape);
    $(this).text(player.shape);
    if(game.checkState() === "win"){
      alert("You are a Winrar!!!!11!");
      clearBoard();
      game.makeBoard();
    }else if(game.checkState()==="cats"){
      alert("Awwww cats!");
      clearBoard();
      game.makeBoard();
      clearBoard();
      game.makeBoard();
    }
    updateDisplay();
  });
});
