//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//      Variables!!!                                    //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////

// new Phaser.Game(width, height, )
var game = new Phaser.Game(720, 365, Phaser.AUTO, 'phaser-example', { preload: this.preload, create: this.create, update: this.update });

var s;
var text;
var textArray = [];
var cnt = 0;
var monsters = [];
var playerCardsObject = {};
var playerCards = [];
var btnAttack;
var btnDiscard;
var btnDone;
var btnStart;
var castlewedge1;
var castlewedge2;
var castlewedge3;
var castlewedge4;
var castlewedge5;
var castlewedge6;
var castleFlag;
var destroyedCastles = 0;

var goodGuySprite;
var goodGuyID = undefined;
var monsterSprite;
var monsterID = undefined;

var p1score;
var p2score;

var style = {font: "20px Arial", fill: "#ffffff", wordWrap: false, align: "center"};

var playerMove = 0; // Changed with btnDone

var cardLoc = [ [ [0.01, 0.49], [0.1, 0.49], [0.19, 0.49],
            [0.01, 0.74], [0.1, 0.74], [0.19, 0.74] ],
            [ [0.91, 0.49], [0.82, 0.49], [0.73, 0.49],
            [0.91, 0.74], [0.82, 0.74], [0.73, 0.74] ] ];

var monsterLoc = {
  1 : [[0.52,	0.08],	[0.62,	0.18],
  	   [0.5,	0.15],	[0.60,	0.26],
	     [0.53,	0.23],	[0.57,	0.28],
       [0.50,	0.28],	[0.54,	0.32],
       [0.50,	0.36]],
  2 : [[0.66,	0.32],	[0.66,	0.57],
  	   [0.63,	0.35],	[0.63,	0.53],
	     [0.59,	0.39],	[0.58,	0.53],
       [0.56,	0.39],	[0.56,	0.50],
       [0.52,	0.45]],
  3 : [[0.62,	0.69],	[0.51,	0.82],
   	   [0.58,	0.67],	[0.53,	0.74],
  	   [0.57,	0.60],	[0.50,	0.68],
       [0.53,	0.57],	[0.49,	0.62],
       [0.50,	0.53]],
  4 : [[0.46,	0.82],	[0.32,	0.67],
       [0.42,	0.73],	[0.38,	0.69],
       [0.45,	0.68],	[0.39,	0.61],
       [0.42,	0.57],	[0.46,	0.61],
       [0.46,	0.53]],
  5 : [[0.31,	0.60],	[0.29,	0.32],
       [0.33,	0.56],	[0.33,	0.35],
       [0.36,	0.52],	[0.36,	0.36],
       [0.39,	0.50],	[0.39,	0.40],
       [0.43,	0.45]],
  6 : [[0.33,	0.21],	[0.46,	0.07],
       [0.37,	0.21],	[0.42,	0.16],
       [0.38,	0.30],	[0.46,	0.28],
       [0.42,	0.31],	[0.46,	0.28],
       [0.45,	0.37]]
};

// False - only one monster on that wedge[ring]
// TODO: actually use this :)
var doubleMonster = {
  1 : [false,false,false,false],
  2 : [false,false,false,false],
  3 : [false,false,false,false],
  4 : [false,false,false,false],
  5 : [false,false,false,false],
  6 : [false,false,false,false]
};



//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//      Phaser.Game Functions!                          //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////


function preload() {

    //  This sets a limit on the up-scale
    // 720 x 365 ... 1440 x 730
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 720;
    this.scale.minHeight = 365;
    this.scale.maxWidth = 1440;
    this.scale.maxHeight = 730;
    this.scale.forceLandscape = true;
    this.scale.pageAlignHorizontally = true;
    //this.scale.setScreenSize(true); //this was shown in someone's code, but it causes an error...seems to work without it


    //  Unique identifier, URL of the image (relative)
    game.load.image("background", "styles/map-with-circles.png");

    // monsters
    game.load.image('orc', 'images/orc.png');

    // buttons
    game.load.image("btnAttack", "styles/btnAttack.png");
    game.load.image("btnDiscard", "styles/btnDiscard.png");
    game.load.image("btnDone", "styles/btnDone.png");
    game.load.image("btnStart", "styles/btnStart.png");
    game.load.image("btn1Player", "styles/btn1Player.png");
    game.load.image("btn2Players", "styles/btn2Players.png");

    // cards
    game.load.image("RedKnight", "styles/RedKnight.png");
    game.load.image("BlueKnight", "styles/BlueKnight.png");
    game.load.image("GreenKnight", "styles/GreenKnight.png");
    game.load.image("RedArcher", "styles/RedArcher.png");
    game.load.image("BlueArcher", "styles/BlueArcher.png");
    game.load.image("GreenArcher", "styles/GreenArcher.png");
    game.load.image("RedSwordsman", "styles/RedSwordsman.png");
    game.load.image("BlueSwordsman", "styles/BlueSwordsman.png");
    game.load.image("GreenSwordsman", "styles/GreenSwordsman.png");

    // castle
    game.load.image("castle", "styles/castle.png");

}



function create() {
    // ORDER OF CREATION AFFECTS Z-INDEX!!

    // (x pos, y pos, key)
    var bng = game.add.sprite(0,0, 'background');
    bng.height = game.height;
    bng.width = game.width;

    // Castle
    castlewedge1 = game.add.sprite(360,125, 'castle');
    castlewedge1.scale.setTo(1.5,1.5);
    castlewedge1.angle += 30;

    castlewedge2 = game.add.sprite(410,155, 'castle');
    castlewedge2.scale.setTo(1.5,1.5);
    castlewedge2.angle += 90;

    castlewedge3 = game.add.sprite(410,210, 'castle');
    castlewedge3.scale.setTo(1.5,1.5);
    castlewedge3.angle += 150;

    castlewedge4 = game.add.sprite(360,245, 'castle');
    castlewedge4.scale.setTo(1.5,1.5);
    castlewedge4.angle += 210;

    castlewedge5 = game.add.sprite(310,215, 'castle');
    castlewedge5.scale.setTo(1.5,1.5);
    castlewedge5.angle -= 90;

    castlewedge6 = game.add.sprite(310,155, 'castle');
    castlewedge6.scale.setTo(1.5,1.5);
    castlewedge6.angle -= 30;

    // (xpos, ypos, button sprite, function, callBack)
    btnAttack = game.add.button(5, 130, 'btnAttack', onAttackClick, this);
    btnAttack.name = "btnAttack";
    btnAttack.scale.setTo(0.3, 0.3);

    btnDiscard = game.add.button(70, 130, 'btnDiscard', onDiscardClick, this);
    btnDiscard.name = "btnDiscard";
    btnDiscard.scale.setTo(0.3, 0.3);

    btnDone = game.add.button(135, 130, 'btnDone', onDoneClick, this);
    btnDone.name = "btnDone";
    btnDone.scale.setTo(0.3, 0.3);

    btnStart = game.add.button(27, 70, 'btnStart', onStartClick, this);
    btnStart.name = "btnStart";
    btnStart.scale.setTo(1, 1);



    // CHANGED: Add 1 Player / 2 Players buttons
    style = {font: "20px Arial", fill: "#ffffff", wordWrap: false, align: "center"};

    playerOneScoreText = game.add.text(30, 0, "Player 1 Score: " + "N/A", style);
    playerTwoScoreText = game.add.text(530, 0, "Player 2 Score: " + "N/A", style);

    update();
}


function update() {
  if (player.length == 0) {
    p1score = 0;
    p2score = 0;
  } else if (player.length == 1) {
    p1score = player[0].score;
    p2score = "N/A";
  } else if (player.length == 2) {
    p1score = player[0].score;
    p2score = player[1].score;
  }

  playerOneScoreText.setText("Player 1 Score: " + p1score);
  playerTwoScoreText.setText("Player 2 Score: " + p2score);

  for (var i = 0; i < monsters.length; i++) {
    textArray[i].x = Math.floor(monsters[i].x + monsters[i].width / 2);
    textArray[i].y = Math.floor(monsters[i].y + 0 * monsters[i].height / 2);
    textArray[i].setText("HP: " + monsters[i].name[3])
  }
}




//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//      Managing Sprites Functions!                     //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////

function drawHands() {

  for (var aPlayer in player) {
    playerCards = [];
    for (var i = 0; i < 6; i++) {

      playerCards[i] = game.add.sprite(cardLoc[aPlayer][i][0] * game.width, cardLoc[aPlayer][i][1] * game.height, player[aPlayer].cardsInHand[i]);
      playerCards[i].name = player[aPlayer].cardsInHand[i];
      console.log(player[aPlayer].cardsInHand[i]);
      playerCards[i].scale.setTo(1.5,1.5);
    };

    console.log("aPlayer is: " + aPlayer);
    console.log(playerCards);
    playerCardsObject[aPlayer] = playerCards;
  };
}

function drawMonsters() {
  clearMonstersOnBoard();

  // Winning Condition -- no more monsters
  if (monstersOnBoard.length === 0) {
    style = {font: "40px Arial", fill: "#52ff00", wordWrap: false, align: "center"};
    var gameOverL = game.add.text(200, 100, "You defeated them! \n GAME OVER \n GAME OVER", style);
    var gameOverR = game.add.text(200, 100, "You defeated them! \n GAME OVER \n GAME OVER", style);
    game.physics.enable(gameOverL, Phaser.Physics.ARCADE);
    game.physics.enable(gameOverR, Phaser.Physics.ARCADE);
    gameOverR.body.velocity.x=100;
    gameOverL.body.velocity.x=-100;
  }

  for (var i = 0; i < monstersOnBoard.length; i++) {

    var monsterWedgeNum = monstersOnBoard[i][2].split(" ")[0]; // 1...2...3 ... etc
    var monsterRingID = monstersOnBoard[i][2].split(" ")[2]; // Archer... Knight... etc
    var monsterCoordinatesX;
    var monsterCoordinatesY;

    castleFlag = false;

    if (monsterRingID == "Forest") {
      if (doubleMonster[monsterWedgeNum][0] == false) {
        monsterCoordinatesX = monsterLoc[monsterWedgeNum][0][0];
        monsterCoordinatesY = monsterLoc[monsterWedgeNum][0][1];
      } else {
        monsterCoordinatesX = monsterLoc[monsterWedgeNum][1][0];
        monsterCoordinatesY = monsterLoc[monsterWedgeNum][1][1];
      }
    } else if (monsterRingID == "Archer") {
      if (doubleMonster[monsterWedgeNum][1] == false) {
        monsterCoordinatesX = monsterLoc[monsterWedgeNum][2][0];
        monsterCoordinatesY = monsterLoc[monsterWedgeNum][2][1];
      } else {
        monsterCoordinatesX = monsterLoc[monsterWedgeNum][3][0];
        monsterCoordinatesY = monsterLoc[monsterWedgeNum][3][1];
      }
    } else if (monsterRingID == "Knight") {
      if (doubleMonster[monsterWedgeNum][2] == false) {
        monsterCoordinatesX = monsterLoc[monsterWedgeNum][4][0];
        monsterCoordinatesY = monsterLoc[monsterWedgeNum][4][1];
      } else {
        monsterCoordinatesX = monsterLoc[monsterWedgeNum][5][0];
        monsterCoordinatesY = monsterLoc[monsterWedgeNum][5][1];
      }
    } else if (monsterRingID == "Swordsman") {
      if (doubleMonster[monsterWedgeNum][3] == false) {
        monsterCoordinatesX = monsterLoc[monsterWedgeNum][6][0];
        monsterCoordinatesY = monsterLoc[monsterWedgeNum][6][1];
      } else {
        monsterCoordinatesX = monsterLoc[monsterWedgeNum][7][0];
        monsterCoordinatesY = monsterLoc[monsterWedgeNum][7][1];
      }
    } else {
      monsterCoordinatesX = monsterLoc[monsterWedgeNum][8][0];
      monsterCoordinatesY = monsterLoc[monsterWedgeNum][8][1];
      castleFlag = true;
    }

    console.log("CastleFlag: " + castleFlag);

    if (castleFlag === false) {
      monsters[i] = game.add.sprite(monsterCoordinatesX * game.width, monsterCoordinatesY * game.height, 'orc');
      monsters[i].name = [ i, monstersOnBoard[i][1], monstersOnBoard[i][2], monstersOnBoard[i][3]];
      monsters[i].scale.setTo(0.5,0.5);

      style = {font: "10px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: monsters[i].width, align: "center"};

      textArray[i] = game.add.text(0, 0, "HP: " + monstersOnBoard[i][3], style);
      textArray[i].anchor.set(0.5);
    } else {

      switch (parseInt(monsterWedgeNum)) {
        case 1 :
          castlewedge1.visible = false;
          destroyedCastles += 1;
          break;
        case 2 :
          castlewedge2.visible = false;
          destroyedCastles += 1;
          break;
        case 3 :
          castlewedge3.visible = false;
          destroyedCastles += 1;
          break;
        case 4 :
          castlewedge4.visible = false;
          destroyedCastles += 1;
          break;
        case 5 :
          castlewedge5.visible = false;
          destroyedCastles += 1;
          break;
        case 6 :
          castlewedge6.visible = false;
          destroyedCastles += 1;
          break;
      }
    }

    // Losing Condition -- all castles are gone
    if ( destroyedCastles === 6 ) {
      style = {font: "40px Arial", fill: "#ff0000", wordWrap: false, align: "center"};
      var gameOverL = game.add.text(200, 100, "You were overrun! \n GAME OVER \n GAME OVER", style);
      var gameOverR = game.add.text(200, 100, "You were overrun! \n GAME OVER \n GAME OVER", style);
      game.physics.enable(gameOverL, Phaser.Physics.ARCADE);
      game.physics.enable(gameOverR, Phaser.Physics.ARCADE);
      gameOverR.body.velocity.x=100;
      gameOverL.body.velocity.x=-100;
    }
  }
  update();
}





// Removes the card sprites, draws up to a hand of 6 cards, and redraws the cards
function clearAndRebuildPlayerCards() {
  // Clear cards
  for (var i = 0; i < 6; i++) {
    playerCardsObject[playerMove][i].destroy()
  }

  playerCards = [];

  for (var i = 0; i < 6; i++) {
    playerCards[i] = game.add.sprite(cardLoc[playerMove][i][0] * game.width, cardLoc[playerMove][i][1] * game.height, player[playerMove].cardsInHand[i]);
    playerCards[i].name = player[playerMove].cardsInHand[i];
    console.log(player[playerMove].cardsInHand[i]);
    playerCards[i].scale.setTo(1.5,1.5);
  };

  playerCardsObject[playerMove] = playerCards;
}


// Remove the monsters (and text) from the board
function clearMonstersOnBoard() {
  // Clear monsters
  for (var i = 0; i < monsters.length; i++) {
    monsters[i].destroy();
    textArray[i].destroy()
  }
}





//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//      Button Click Functions!                         //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////




// CLICK ATTACK
function onAttackClick(sprite, pointer) {
  for (var i = 0; i < playerCardsObject[playerMove].length; i++) {
    console.log("attack clicked");
    playerCardsObject[playerMove][i].inputEnabled = true;
    playerCardsObject[playerMove][i].events.onInputDown.add(onGoodGuyClick, this);

  }

  for (var i = 0; i < monsters.length; i++) {
    console.log("attack clicked");
    monsters[i].inputEnabled = true;
    monsters[i].events.onInputDown.add(onMonsterClick, this);

  }
  update();
}

function onGoodGuyClick(sprite, pointer) {
  //clearIDTags();
  goodGuySprite = sprite;
  goodGuyID = sprite.name;
  console.log("onGoodGuyClick");
  console.log("goodGuyID:");
  console.log(goodGuyID);
  console.log("monsterID:");
  console.log(monsterID);

  if (typeof(goodGuyID) !== 'undefined' && goodGuyID != "" && typeof(monsterID) !== 'undefined' && monsterID.length !== 1) {
    initiateAttack(goodGuyID,monsterID);
  };

}

function onMonsterClick(sprite, pointer) {
  //clearIDTags();
  monsterSprite = sprite;
  monsterID = sprite.name;
  console.log("onMonsterClick");
  console.log("goodGuyID:");
  console.log(goodGuyID);
  console.log("monsterID:");
  console.log(monsterID);

  if (typeof(goodGuyID) !== 'undefined' && goodGuyID != "" && typeof(monsterID) !== 'undefined' && monsterID.length !== 1) {
    initiateAttack(goodGuyID,monsterID);
  };
}


function initiateAttack(goodGuyIDVar,monsterIDVar) {
  console.log("initiateAttack");

    if (goodGuyIDVar == (monsterIDVar[2].split(" ")[1] + monsterIDVar[2].split(" ")[2])) {
      console.log(goodGuyIDVar);
      console.log("-Attacked-");
      console.log(monsterIDVar);

      player[playerMove];
      goodGuySprite.destroy();
      discardPile.push(goodGuyIDVar);

      for (var i = 0; i < player[playerMove].cardsInHand.length; i++) {
        if (player[playerMove].cardsInHand[i] == goodGuyIDVar) {
          console.log("index:" + i);
          var index = i;
        }
      }

      player[playerMove].cardsInHand.splice(index,1);
      player[playerMove];

      console.log("HP adjusted for...");
      for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].name == monsterIDVar) {
          console.log("index:" + i);
          var index = i;
        }
      }

      for (var i = 0; i < monstersOnBoard.length; i++) {
        if (monstersOnBoard[i][2] == monsterIDVar[2]) {
          console.log("monsters on board index: " + i);
          var idxMonstersOnBoard = i;
        }
      }


      console.log(monsters[index].name);

      // Reduce HP by 1
      monsters[index].name[3] -= 1;
      monstersOnBoard[idxMonstersOnBoard][3] = monstersOnBoard[idxMonstersOnBoard][3] - 1;

      // if HP is at 0
      if (monsters[index].name[3] == 0) {
        monstersOnBoard.splice(idxMonstersOnBoard,1);
        monsters[index].destroy();
        monsters.splice(index,1);
        player[playerMove].increaseScore(100); //for now all the same points
        console.log("monster removed");
      }

    } else {
      console.log("Not a valid attack", goodGuyID, monsterID);
    }

  goodGuyID = "";
  monsterID = [0];
}



// CLICK DONE
function onDoneClick(sprite, pointer) {
  drawCardsUntilSix(); // draw up until you have 6 cards in hand

  clearAndRebuildPlayerCards(); // remove the card sprites and replaces with new hand

  moveMonstersInOne(); // move the monsters on the board a ring closer

  addMonsterTokenToBoard(); // add 1 monster token to the board
  addMonsterTokenToBoard(); // add another! hahaha

  drawMonsters(); // redraw the monsters


  console.log("soloPlay: " + soloPlay);
  console.log("playerMove: " + playerMove);
  // just for 2 players ... keeps track of who's move it is
  if (soloPlay == false) {
    if (playerMove == 0) {
      playerMove = 1;
      btnDone.reset(650,130);
      btnDiscard.reset(585, 130);
      btnAttack.reset(520, 130);
    } else {
      playerMove = 0;
      btnAttack.reset(5, 130);
      btnDiscard.reset(70, 130);
      btnDone.reset(135,130);
    }
  }
}


// CLICK START
function onStartClick(sprite,pointer) {
  console.log("start the game!!!!");
  sprite.destroy();

  btn1Player = game.add.button(20, 90, 'btn1Player', on1PlayerClick, this);
  btn1Player.name = "btn1Player";
  btn1Player.scale.setTo(1, 1);

  btn2Players = game.add.button(360, 90, 'btn2Players', on2PlayersClick, this);
  btn2Players.name = "btn2Players";
  btn2Players.scale.setTo(1, 1);
};

function on1PlayerClick(sprite,point) {
  console.log("1 Player Game!");
  sprite.destroy();
  btn2Players.destroy();
  soloPlay = true;
  prepareGame(1);
}

function on2PlayersClick(sprite,point) {
  console.log("2 Player Game!");
  sprite.destroy();
  btn1Player.destroy();
  soloPlay = false;
  prepareGame(2);
}


// CLICK DISCARD
function onDiscardClick(sprite, pointer) {
  for (var i = 0; i < playerCardsObject[playerMove].length; i++) {
    console.log("discard clicked");
    playerCardsObject[playerMove][i].inputEnabled = true;
    playerCardsObject[playerMove][i].events.onInputDown.add(discardMe, this);

  }
  update();
}

function discardMe(sprite, pointer) {
  //clearIDTags();
  var cardName = sprite.name;

  sprite.destroy();
  discardPile.push(cardName);

  for (var i = 0; i < player[playerMove].cardsInHand.length; i++) {
    if (player[playerMove].cardsInHand[i] == cardName) {
      console.log("index:" + i);
      var index = i;
    }
  }

  player[playerMove].cardsInHand.splice(index,1);
  discardPile.push(cardName);

  drawCardsUntilSix();
  clearAndRebuildPlayerCards();

  btnDiscard.visible = false;

}
