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
    quantity: 3
  },
  archer : {
    name: "Archer",
    type: "archer",
    quantity: 3
  },
  knight : {
    name: "Knight",
    type: "knight",
    quantity: 3
  },
  hero : {
    name: "Hero",
    type: "hero",
    quantity: 1
  },
  special : {
    name: ["Barbarian", "Draw 2 Cards", "Drive Him Back", "Fortify",
          "Scavenge", "Tar", "Nice Shot", "Missing"],
    type: "special",
    quantity: 1
  },
  bricks : {
    name: "Bricks",
    type: "bricks",
    quantity: 4
  },
  mortar : {
    name: "Mortar",
    type: "mortar",
    quantity: 4
  }
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

monsters = {
  goblin : {
    name: "Goblin",
    type: "goblin",
    HP: 1,
    quantity: 6
  },
  orc : {
    name: "Orc",
    type: "orc",
    HP: 2,
    quantity: 11
  },
  troll : {
    name: "Troll",
    type: "troll",
    HP: 3,
    quantity: 9
  },
  boss : {
    name: ["Goblin King", "Orc Warlord", "Healer", "Troll Mage"],
    type: "boss",
    HP: [2, 3, 2, 3],
    quantity: 1
  },
  special : {
    name: ["All Players Discard 1", "All Players Discard", "Monsters Move Clock-Wise",
          "Monsters Move Counter-Clock-Wise", "Draw 3 Monster Tokens", "Draw 4 Monster Tokens",
          "Red Monsters Move 1", "Red Monsters Move 1", "Blue Monsters Move 1",
          "Blue Monsters Move 1", "Green Monsters Move 1", "Green Monsters Move 1",
          "Plague Swordsmen", "Plague Knights", "Plague Archers", "Giant Boulder",
          "Giant Boulder", "Giant Boulder", "Giant Boulder"],
    type: "special",
    HP: 0,
    quantity: 1
  },

}; // end monsters variable

var drawPile = []; // before making hands for players, this is full (49)
var discardPile; // before making hands for players, this is empty (0)





// Player constructor
function playerMaker(name, score, cardsInHand) {
  this.name = name;
  this.score = score;
  this.cardsInHand = cardsInHand;

  this.increaseScore = function(points) {
    this.score += points;
  }

}


// Start of Player Deck Initialization

// Create the Deck of Cards
function initializeCards() {
  for (var card in cards) {
    switch (cards[card].type) {
      case "swordsman" :

        for (var i = 0; i < cards[card].quantity; i++) {
          addColorToNameAndPush(cards[card].name);
        }
        drawPile.push("Any Color " + cards[card].name);
        break;

      case "knight" :

        for (i = 0; i < cards[card].quantity; i++) {
          addColorToNameAndPush(cards[card].name);
        }
        drawPile.push("Any Color " + cards[card].name);
        break;

      case "archer" :

        for (i = 0; i < cards[card].quantity; i++) {
          addColorToNameAndPush(cards[card].name);
        }
        drawPile.push("Any Color " + cards[card].name);
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
        console.log("something went wrong!");
      }
  }
}

// For Swordsman, Knights, Archers, and Heros, add the color to the name
function addColorToNameAndPush(name) {
  drawPile.push("Blue " + name);
  drawPile.push("Red " + name);
  drawPile.push("Green " + name);
  return;
}


// Start of the Monsters Initialization








//
// Helper Functions
//


// Shuffles an array using the Fisher-Yates Shuffle
// Code: http://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle (array) {
  var i = 0, j = 0, temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
