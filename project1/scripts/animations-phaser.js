// new Phaser.Game(width, height, )
var game = new Phaser.Game(720, 365, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

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

var goodGuyID;
var monsterID;

var playerMove = 0; //Done btn to change this?

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
}

function callme() {
  s.x += 40;
}

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
    game.load.image("btnAttack", "styles/btnAttack.png")
    game.load.image("btnDiscard", "styles/btnDiscard.png")
    game.load.image("btnDone", "styles/btnDone.png")

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


}

function drawHands() {
  //console.log(player[0].cardsInHand);

  for (var aPlayer in player) {
    playerCards = [];
    for (var i = 0; i < 6; i++) {
      // var spriteX = (game.width * 0.5) - (s.width / 2); // 50%
      // var spriteY = (game.height * 0.5) - (s.height / 2); // 50%
      //monsters[cnt] = game.add.sprite(spriteX, spriteY, 'orc');
      playerCards[i] = game.add.sprite(cardLoc[aPlayer][i][0] * game.width, cardLoc[aPlayer][i][1] * game.height, player[aPlayer].cardsInHand[i]);
      //playerCards[i].inputEnabled = true;
      //playerCards[i].events.onInputDown.add(onPlayerActionClick, this);
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



}

function onPlayerActionClick(sprite, pointer) {
  console.log(sprite.name);
}

function create() {
    // ORDER OF CREATION AFFECTS Z-INDEX!!

    // (x pos, y pos, key)
    var bng = game.add.sprite(0,0, 'background');
    bng.height = game.height;
    bng.width = game.width;

    // (xpos, ypos, button sprite, function, callBack)
    btnAttack = game.add.button(5, 130, 'btnAttack', onAttackClick, this);
    btnAttack.name = "btnAttack";
    btnAttack.scale.setTo(0.3, 0.3);

    btnDiscard = game.add.button(70, 130, 'btnDiscard', actionOnClick, this);
    btnDiscard.name = "btnDiscard";
    btnDiscard.scale.setTo(0.3, 0.3);

    btnDone = game.add.button(135, 130, 'btnDone', actionOnClick, this);
    btnDone.name = "btnDone";
    btnDone.scale.setTo(0.3, 0.3);

    // TODO: Add 1 Player / 2 Players buttons



    // var card = game.add.sprite(0, 275, 'RedArcher');
    // card.name = ["goblin", 1, "1 Red Archer"];
    // card.scale.setTo(1.5,1.5);
    //
    // card.inputEnabled = true; // DONT FORGET THIS!!
    // card.events.onInputOver.add(onClick, this);
    // s = card;


    var image = game.add.sprite(360, 25, 'orc');
    image.name = ["goblin", 1, "1 Red Archer"];
    image.scale.setTo(0.5,0.5);

    // image.inputEnabled = true; // DONT FORGET THIS!!
    // image.events.onInputOver.add(onOver, this);

     s = image;
     s.events.onInputDown.add(onClick, this);
    game.physics.enable(image, Phaser.Physics.ARCADE);


    // Create text
    var style = {font: "10px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: s.width, align: "center"};

    text = game.add.text(0, 0, "HP: 3", style);
    text.anchor.set(0.5);


    //image.body.velocity.x=150;
    //update();
}

function onOver(sprite, pointer) {
  console.log(sprite.name);
  console.log(sprite.worldPosition);
}

function actionOnClick(sprite, pointer) {
  console.log(sprite.name + " has been clicked");
  // sprite.tint = 0xdf4efc;
}

function callingFromAnimation() {
  console.log("it works!");
}






function onClick(sprite, pointer) {
  // sprite.tint = 0xff7777;
  // console.log(sprite.name[2]);
  cnt += 1;
  var spriteX = (game.width * 0.5) - (s.width / 2); // 50%
  var spriteY = (game.height * 0.5) - (s.height / 2); // 50%
  //monsters[cnt] = game.add.sprite(spriteX, spriteY, 'orc');
  monsters[cnt] = game.add.sprite(loc[cnt][0] * game.width, loc[cnt][1] * game.height, 'orc');
  monsters[cnt].inputEnabled = true;
  monsters[cnt].events.onInputOver.add(onOver, this);
  monsters[cnt].name = ["goblin", 1, "1 Red Archer"];
  monsters[cnt].scale.setTo(0.5,0.5);

  var style = {font: "10px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: monsters[cnt].width, align: "center"};

  textArray[cnt] = game.add.text(0, 0, "HP: 3", style);
  textArray[cnt].anchor.set(0.5);
}

function update() {
  // Keeps text with an object
  text.x = Math.floor(s.x + s.width / 2);
  text.y = Math.floor(s.y + 0 * s.height / 2);

  for (var i = 1; i < monsters.length; i++) {
    textArray[i].x = Math.floor(monsters[i].x + monsters[i].width / 2);
    textArray[i].y = Math.floor(monsters[i].y + 0 * monsters[i].height / 2);
  }


// for movement
//   if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
// {
//     s.x -= 1;
//     console.log(s.worldPosition);
// }
// else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
// {
//     s.x += 1;
//     console.log(s.worldPosition);
// }
//
// if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
// {
//     s.y -= 1;
//     console.log(s.worldPosition);
// }
// else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
// {
//     s.y += 1;
//     console.log(s.worldPosition);
// }


}


function onAttackClick(sprite, pointer) {
  for (var i = 0; i < playerCardsObject[playerMove].length; i++) {
    console.log("attack clicked");
    playerCardsObject[playerMove][i].inputEnabled = true;
    playerCardsObject[playerMove][i].events.onInputDown.add(onGoodGuyClick, this);

  }
  update();
}

function onGoodGuyClick(sprite, pointer) {
  goodGuyID = sprite.name;
  console.log(goodGuyID);
}
