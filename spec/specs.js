describe('Player', function() {
    it("returns the player's mark", function() {
      var testPlayer = new Player("X");
      expect(testPlayer.mark()).to.equal("X");
   });
});

describe('Space', function() {
    it("returns the player's mark", function() {
      var testSpace = new Space(1,2);
      expect(testSpace.x).to.equal(1);
   });
});

describe('Space', function() {
    it("returns the player's mark", function() {
      var testSpace = new Space(1,2);
      expect(testSpace.y).to.equal(2);
   });

  it("lets a player mark a space", function() {
      var testPlayer = new Player("X");
      var testSpace = new Space(1,2);
      testSpace.markedBy(testPlayer)
      expect(testSpace.markedBy()).to.equal(testPlayer);
   });
});

describe('Board', function() {
  it("creates spaces when it is initialized", function() {
    var testBoard = new Board();
    expect(testBoard.length).to.equal(9);
   });

   it("creates spaces with x and y keys that are 0,0 for first object", function() {
     var testBoard = new Board();
     expect(testBoard).to.have.deep.property('[0].x',0);
     expect(testBoard).to.have.deep.property('[0].y',0);

  });

  it("creates spaces with x and y keys", function() {
    var testBoard = new Board();
    testBoard.should.all.have.property('x');
    testBoard.should.all.have.property('y');
   });

   it("creates spaces and marks the first space with player x", function() {
     var testBoard = new Board();
     var testPlayer = new Player("X");
     testBoard[0].markedBy(testPlayer);
     expect(testBoard[0].mark).to.equal(testPlayer);
    });
});

describe('Game', function () {
  it("initializes the board", function () {
    var testGame = new Game();
    var testBoard = new Board();
    expect(testGame.makeBoard()).to.eql(testBoard);
  });
  it("initializes the players", function () {
    var testGame = new Game();
    var testPlayer1 = new Player("X");
    var testPlayer2 = new Player("O");
    testGame.makePlayers(1);
    expect(testGame.player1).to.eql(testPlayer1);
    testGame.makePlayers(2);
    expect(testGame.player1).to.eql(testPlayer1);
    expect(testGame.player2).to.eql(testPlayer2);
  });
});
