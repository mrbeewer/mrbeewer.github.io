//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//                      Variables!!                     //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////


// 3 Heros (1 of each color)
// 3 Green / 3 Red / 3 Blue Archers
// 1 Any Color Archer
// 3 Green / 3 Red / 3 Blue Swordsman
// 1 Any Color Swordsman
// 3 Green / 3 Red / 3 Blue Swordsman
// 1 any color knight
// 8 Special (purple): Barbarian, Draw 2 Cards, Drive Him Back, Fortify Wall,
//        Scavenge, Tar, Nice Shot, Missing
// 4 Bricks / 4 Mortar


// Variables
cards = {
  swordsman : {
    name: "Swordsman",
    type: "swordsman",
    quantity: 6
  },
  archer : {
    name: "Archer",
    type: "archer",
    quantity: 6
  },
  knight : {
    name: "Knight",
    type: "knight",
    quantity: 6
  } // TODO: Add in Hero, Special, Bricks, and Mortar
  // hero : {
  //   name: "Hero",
  //   type: "hero",
  //   quantity: 1
  // },
  // special : {
  //   name: ["Barbarian", "Draw 2 Cards", "Drive Him Back", "Fortify",
  //         "Scavenge", "Tar", "Nice Shot", "Missing"],
  //   type: "special",
  //   quantity: 1
  // },
  // bricks : {
  //   name: "Bricks",
  //   type: "bricks",
  //   quantity: 4
  // },
  // mortar : {
  //   name: "Mortar",
  //   type: "mortar",
  //   quantity: 4
  // }
}; // end cards variable


// MONSTERS
// 6 Goblins (HP 1)
// 11 Orc (HP 2)
// 9 Troll (HP 3)
// 4 Bosses: Goblin King (HP 2), Orc Warlord (HP 3)
//            Healer (HP 2), Troll Mage (HP 3)
// 19 Special: All Players Discard 1 (2x), Monsters Move CW,
//            Monsters Move CCW, Draw 3 Monster Tokens,
//            Draw 4 Monster Tokens, Red Monsters Move 1 (2x),
//            Green Monsters Move 1 (2x), Blue Monsters Move 1 (2x),
//            Plague Swordsman, Plague Knights, Plague Archers,
//            Giant Boulders (4x)

monsterTokens = {
  goblin : {
    name: "Goblin",
    type: "goblin",
    HP: 1,
    quantity: 3 // 3 will be on the board ... originally 3
  },
  orc : {
    name: "Orc",
    type: "orc",
    HP: 2,
    quantity: 9 // 2 will be on the board ... originally 9
  },
  troll : {
    name: "Troll",
    type: "troll",
    HP: 3,
    quantity: 8 // 1 will be on the board ... originally 8
  }
  // TODO: Add in Boss, Special monster tokens
  // boss : {
  //   name: ["Goblin King", "Orc Warlord", "Healer", "Troll Mage"],
  //   type: "boss",
  //   HP: [2, 3, 2, 3],
  //   quantity: 1
  // },
  // special : {
  //   name: ["All Players Discard 1", "All Players Discard", "Monsters Move Clock-Wise",
  //         "Monsters Move Counter-Clock-Wise", "Draw 3 Monster Tokens", "Draw 4 Monster Tokens",
  //         "Red Monsters Move 1", "Red Monsters Move 1", "Blue Monsters Move 1",
  //         "Blue Monsters Move 1", "Green Monsters Move 1", "Green Monsters Move 1",
  //         "Plague Swordsmen", "Plague Knights", "Plague Archers", "Giant Boulder",
  //         "Giant Boulder", "Giant Boulder", "Giant Boulder"],
  //   type: "special",
  //   HP: 0,
  //   quantity: 1
  // }
}; // end monsters variable

boardLocations = {
  one : {
    forest : [376, 29, 443, 66],
    archer : [360, 53, 435, 95],
    knight : [383, 85, 409, 104],
    swordsman : [359, 104, 387, 118],
    castle : [362, 132]
  }

}

var drawPile = []; // before making hands for players, this is full (49)
var discardPile = []; // before making hands for players, this is empty (0)

var monsterTokenBag = []; // Collection of monster tokens to pull from (49 at start)
var monstersOnBoard = []; // collection of monster tokens currently on the board (object)
var monsterID = 5; // counter to give IDs to the monster tokens (5 from 0-5 on the board)

var soloPlay = true; // flag for solo play or 2 player

var cardsInHand = [];
var player = [];

var red = [1,2]; // Corresponding Color and Num Region
var green = [3,4];
var blue = [5,6];
var colorWedges = ["Red", "Red", "Green", "Green", "Blue", "Blue"];

// Setting Variables
var shuffleFactor = 5; // The number of shuffle iterations









//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//                       Functions!                     //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////


// Player constructor
function playerMaker(name) {
  this.name = name;
  this.score = 0;
  this.cardsInHand = [];
  this.cardsQty = this.cardsInHand.length;

  this.increaseScore = function(points) {
    this.score += points;
  }

  this.addCardToHand = function(popped) {
    console.log(popped);
    this.cardsInHand.push(popped);
    this.cardsQty = this.cardsInHand.length;
  }
}


// Prepare Everything
function prepareGame(num) {

  for (var i = 0; i < num; i++) {
    player[i] = new playerMaker("player"+i);
  };

  // Run Functions
  initializeCards();
  console.log(drawPile);
  console.log(drawPile.length);
  shuffle(drawPile);
  console.log(drawPile);
  console.log(drawPile.length);

  initializeMonsterTokens();
  console.log(monsterTokenBag);
  console.log(monsterTokenBag.length);
  shuffle(monsterTokenBag);
  console.log(monsterTokenBag);
  console.log(monsterTokenBag.length);

  // Generate their hands
  createPlayerHands();

  // Show hand(s)
  drawHands();

  // set up the board (array wise)
  setUpBoard();
  console.log(monstersOnBoard);

  // Show Monsters on the board
  drawMonsters();
}


//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//      Creation of Cards and Monsters Functions!       //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////

// Start of Player Deck Initialization

// Create the Deck of Cards
function initializeCards() {
  for (var card in cards) {
    switch (cards[card].type) {
      case "swordsman" :

        for (var i = 0; i < cards[card].quantity; i++) {
          addColorToNameAndPush(cards[card].name);
        }
        // TODO: Add Any Color ****
        //drawPile.push("Any Color " + cards[card].name);
        break;

      case "knight" :

        for (i = 0; i < cards[card].quantity; i++) {
          addColorToNameAndPush(cards[card].name);
        }
        //drawPile.push("Any Color " + cards[card].name);
        break;

      case "archer" :

        for (i = 0; i < cards[card].quantity; i++) {
          addColorToNameAndPush(cards[card].name);
        }
        //drawPile.push("Any Color " + cards[card].name);
        break;

      case "hero" :
        addColorToNameAndPush(cards[card].name);
        break;

      case "bricks" :
        for (i = 0; i < cards[card].quantity; i++) {
          drawPile.push(cards[card].name);
        }
        break;

      case "mortar" :
        for (i = 0; i < cards[card].quantity; i++) {
          drawPile.push(cards[card].name);
        }
        break;

      case "special" :
        for (var id in cards[card].name) {
          drawPile.push(cards[card].name[id]);
        }
        break;

      default:
        console.log("Error: Creation of Player Deck (drawPile)");
      }
  }
}

// For Swordsman, Knights, Archers, and Heros, add the color to the name
function addColorToNameAndPush(name) {
  drawPile.push("Blue" + name);
  drawPile.push("Red" + name);
  drawPile.push("Green" + name);
  return;
}


// Start of the Monsters Initialization
// Create the "Deck" of Monster Tokens
function initializeMonsterTokens() {
  for (var token in monsterTokens) {
    switch (monsterTokens[token].type) {
      case "goblin" :

        for (var i = 0; i < monsterTokens[token].quantity; i++) {
          monsterTokenBag.push(monsterTokens[token].name);
        }
        break;

      case "orc" :

        for (var i = 0; i < monsterTokens[token].quantity; i++) {
          monsterTokenBag.push(monsterTokens[token].name);
        }
        break;

      case "troll" :

        for (var i = 0; i < monsterTokens[token].quantity; i++) {
          monsterTokenBag.push(monsterTokens[token].name);
        }
        break;

      case "boss" :
        for (var id in monsterTokens[token].name) {
          monsterTokenBag.push(monsterTokens[token].name[id]);
        }
        break;

      case "special" :
        for (var id in monsterTokens[token].name) {
          monsterTokenBag.push(monsterTokens[token].name[id]);
        }
        break;

      default:
        console.log("Error: Creation of Monster Token Bag");
      }
  }
}


//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//      Player Hands (Cards) Functions!                 //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////

// Create Player hands
//    TODO: add more than 2 players
function createPlayerHands() {
  var popped;
  for (var aPlayer in player) {
    for (var i = 0; i < 6; i++) {
      popped = drawPile.pop();
      player[aPlayer].addCardToHand(popped);
    };
  };
}

// Draw up so hands are back at 6
function drawCardsUntilSix() {
  for (var i = 0; player[playerMove].cardsInHand.length < 6; i++) {
    popped = drawPile.pop();
    player[playerMove].addCardToHand(popped);
  }
}


//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//         Initial Setup Functions!                     //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////
// Set up the initial board
// Game always starts with 3 Goblin, 2 Orc, and 1 Troll'
// Their starting location (number) is random, but only one
//  monster per number (arc). They start in the Archer Ring.
// monstersOnBoard format --- [4, "orc", "5 Blue Swordsman", 1]
//                            [index, name, wedge color ring, HP]
function setUpBoard() {
  var startingMonsters = ["goblin", "goblin", "goblin", "orc", "orc", "troll"];
  shuffle(startingMonsters);

  for (var i = 0; i < startingMonsters.length; i++) {
    monstersOnBoard.push([i, startingMonsters[i], i + 1 + " " + colorWedges[i] +" Archer", monsterTokens[startingMonsters[i]].HP]);
  };

};

// Add a moster token to the board
function addMonsterTokenToBoard() {
  if (monsterTokenBag.length > 0) {
    var num = rollDie()
    var monName = monsterTokenBag.pop().toLowerCase()
    monstersOnBoard.push([0, monName, num+ " " + colorWedges[num - 1] +" Forest", monsterTokens[monName].HP]);
  }
}



//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//              GamePlay Functions!                     //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////

// player attacking a monster tile
function playerAttack(playerNum, playerCard, monsterNum) {

  // If the card color == wedge color   &&   card type == ring type
  if ( (player[playerNum].cardsInHand[playerCard].split(" ")[0] == monstersOnBoard[monsterNum][2].split(" ")[1]) &&
      (player[playerNum].cardsInHand[playerCard].split(" ")[1] == monstersOnBoard[monsterNum][2].split(" ")[2]) ) {

    // Reduce HP by 1
    monstersOnBoard[monsterNum][3] -= 1;
    console.log(monstersOnBoard[monsterNum][1] + " has lost 1 HP");
    checkForDeadMonsters();
  } else {
    console.log("Error: Not a valid attack ... playerAttack")
  };

}

// player trading cards with another player
function playerTrade(playerNum, giveCard, getCard) {
  // TODO: add trading functionality
}

// player discard card for another card
function playerDiscard(playerNum, discardCard) {
  // TODO: add discarding functionality
}


// Check monstersOnBoard for 0 HP and remove that monster
function checkForDeadMonsters() {
  for (var monster in monstersOnBoard) {
    if (monstersOnBoard[monster][3] == 0) {
      monstersOnBoard.splice(monster, 1);
    }
  }
  // for now, update the text on screen
  showMonstersOnBoard();
}

// Draw token and place
function drawTokenAndPlace() {
  // grab a token from the Bag
  shuffle(monsterTokenBag)
  var newToken = monsterTokenBag.pop();
  // roll die for which wedge
  var location = rollDie();
  monsterID += 1;
  monstersOnBoard.push([monsterID, newToken.toLowerCase(), location + " " + colorWedges[location] +" Archer", monsters[newToken.toLowerCase()].HP]);
  console.log("New Board: ");
  console.log(monstersOnBoard);
}


// Move Monsters In 1
function moveMonstersInOne() {
  var tokenLocation;
  for (var monster in monstersOnBoard) {
      tokenLocation = monstersOnBoard[monster][2].split(" ")[2]
    if (tokenLocation == "Forest") {
      monstersOnBoard[monster][2] = monstersOnBoard[monster][2].replace(/Forest/, "Archer");
    } else if (tokenLocation == "Archer") {
      monstersOnBoard[monster][2] = monstersOnBoard[monster][2].replace(/Archer/, "Knight");
    } else if (tokenLocation == "Knight") {
      monstersOnBoard[monster][2] = monstersOnBoard[monster][2].replace(/Knight/, "Swordsman");
    } else if (tokenLocation == "Swordsman") {
      // TODO: add a check for the walls and castles
      monstersOnBoard[monster][2] = monstersOnBoard[monster][2].replace(/Swordsman/, "Castle");
    }
  }
}



//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//      DOM Printing Functions!                         //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////


// DISPLAY / APPEND FUNCTIONS
function showPlayerInfo() {
  $("body").append("<section id=playerInfo>");

  for (var aPlayer in player) {
    var playerName = $("<article>");
    var playerInfo = $("<li id='playerName'>");
      playerInfo.text(player[aPlayer]["name"]);
      playerName.append(playerInfo);
      var playerInfo = $("<li id='playerScore'>");
      playerInfo.text(player[aPlayer]["score"]);
      playerName.append(playerInfo);
      var playerInfo = $("<li id='playerCardsInHand'>");
      playerInfo.text(player[aPlayer]["cardsInHand"]);
      playerName.append(playerInfo);
      $("#playerInfo").append(playerName);
  }
}

// show the monsters on the board
// monstersOnBoard.push([i, startingMonsters[i], i + 1 + " " + colorWedges[i] +" Archer", monsters[startingMonsters[i]].HP]);
function showMonstersOnBoard() {
  $("body").append("<section id=monsters>");

  for (var token in monstersOnBoard) {
    var playerName = $("<article>");
    var monsterInfo = $("<li id='monsterNum'>");
      monsterInfo.text(monstersOnBoard[token][0]);
      playerName.append(monsterInfo);
      var monsterInfo = $("<li id='monsterName'>");
      monsterInfo.text(monstersOnBoard[token][1]);
      playerName.append(monsterInfo);
      var monsterInfo = $("<li id='monsterLocation'>");
      monsterInfo.text(monstersOnBoard[token][2]);
      playerName.append(monsterInfo);
      var monsterInfo = $("<li id='monsterHP'>");
      monsterInfo.text(monstersOnBoard[token][3]);
      playerName.append(monsterInfo);
      playerName.append("<br>");
      $("#monsters").append(playerName);
  }
}





//////////////////////////////////////////////////////////
//                                                      //
//                                                      //
//                Helper Functions!                     //
//                                                      //
//                                                      //
//////////////////////////////////////////////////////////

function callAnimation() {
  callingFromAnimation();
}


// Roll a 6-sided die and return the number
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

// Shuffles an array using the Fisher-Yates Shuffle
// Code: http://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle (array) {
  for (var multiple = 0; multiple < shuffleFactor; multiple++) {
    var i = 0, j = 0, temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

}
