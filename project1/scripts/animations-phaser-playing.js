// new Phaser.Game(width, height, )
var game = new Phaser.Game(720, 365, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
// game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
// game.scale.setMinMax(800, 600, 1600, 1200);
var s;
var text;
var textArray = [];
var cnt = 0;
var monsters = [];
var btnAttack;
var btnDiscard;
var btnDone;

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


    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('einstein', 'images/orc.png');
    game.load.image("background", "styles/map-with-circles.png");

    game.load.image("btnAttack", "styles/btnAttack.png")
    game.load.image("btnDiscard", "styles/btnDiscard.png")
    game.load.image("btnDone", "styles/btnDone.png")

    game.load.image("redKnight", "styles/RedKnight.png");
    game.load.image("blueKnight", "styles/blueKnight.png");
    game.load.image("greenKnight", "styles/greenKnight.png");
    game.load.image("redArcher", "styles/RedArcher.png");
    game.load.image("blueArcher", "styles/BlueArcher.png");
    game.load.image("greenArcher", "styles/GreenArcher.png");
    game.load.image("redSwordsman", "styles/RedSwordsman.png");
    game.load.image("blueSwordsman", "styles/BlueSwordsman.png");
    game.load.image("greenSwordsman", "styles/GreenSwordsman.png");


}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable

    // (x pos, y pos, key)
    var bng = game.add.sprite(0,0, 'background');
    bng.height = game.height;
    bng.width = game.width;



    // var graphics = game.add.graphics(game.world.centerX, game.world.centerY);
    // //  This will reset the lineStyle
    // graphics.lineStyle(8, 0xffd900);
    //
    // //  And this draws a filled arc
    // graphics.beginFill(0xFF3300);
    // graphics.alpha = 0.5;
    //
    // //  Note the 'true' at the end, this tells it to draw anticlockwise
    // graphics.arc(0, 0, 150, 0, (2/3) * (2 * Math.PI), true);
    // graphics.arc(0, 0, 150, 0, (1/3) * (2 * Math.PI), true);
    // graphics.endFill();

    // //  You can also create an empty Polygon:
    // poly = new Phaser.Polygon();
    //
    // //  And then populate it via setTo, using any combination of values as above
    // //poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);
    // poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200)]);
    //
    //
    // graphics = game.add.graphics(0, 0);
    //
    // graphics.beginFill(0xFF33ff);
    // graphics.alpha = 0.2;
    // graphics.z = -1;
    // //graphics.beginFill(RGBA(100,100,100,0,5));
    // graphics.drawPolygon(poly.points);
    // graphics.endFill();


    btnAttack = game.add.button(5, 75, 'btnAttack', actionOnClick, this);
    btnAttack.name = "btnAttack";
    btnAttack.scale.setTo(1, 1);

    btnDiscard = game.add.button(70, 75, 'btnDiscard', actionOnClick, this);
    btnDiscard.name = "btnDiscard";
    btnDiscard.scale.setTo(1, 1);

    btnDone = game.add.button(135, 75, 'btnDone', actionOnClick, this);
    btnDone.name = "btnDone";
    // btnDone.scale.setTo(1, 1);

    var card = game.add.sprite(0, 275, 'redArcher');
    card.name = ["goblin", 1, "1 Red Archer"];
    card.scale.setTo(1.5,1.5);

    card.inputEnabled = true; // DONT FORGET THIS!!

    card.events.onInputOver.add(onClick, this);
    s = card;


    var image = game.add.sprite(360, 25, 'einstein');
    image.name = ["goblin", 1, "1 Red Archer"];
    image.scale.setTo(0.5,0.5);

    image.inputEnabled = true; // DONT FORGET THIS!!

    image.events.onInputOver.add(onOver, this);

     //s = image;
     //s.events.onInputDown.add(onClick, this);
    game.physics.enable(image, Phaser.Physics.ARCADE);


    // text
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
}


var loc =	[[0.522222222,	0.079452055],	[0.615277778,	0.180821918],
	[0.5,	0.145205479],	[0.604166667,	0.260273973],
	[0.531944444,	0.232876712],	[0.568055556,	0.284931507],
	[0.498611111,	0.284931507],	[0.5375,	0.323287671],
	[0.502777778,	0.361643836]];

var loc = [ [0.01, 0.49], [0.1, 0.49], [0.19, 0.49],
            [0.01, 0.74], [0.1, 0.74], [0.19, 0.74],
            [0.91, 0.49], [0.82, 0.49], [0.73, 0.49],
            [0.91, 0.74], [0.82, 0.74], [0.73, 0.74]];

function onClick(sprite, pointer) {
  // sprite.tint = 0xff7777;
  // console.log(sprite.name[2]);
  cnt += 1;
  var spriteX = (game.width * 0.5) - (s.width / 2); // 50%
  var spriteY = (game.height * 0.5) - (s.height / 2); // 50%
  //monsters[cnt] = game.add.sprite(spriteX, spriteY, 'einstein');
  monsters[cnt] = game.add.sprite(loc[cnt][0] * game.width, loc[cnt][1] * game.height, 'redArcher');
  monsters[cnt].inputEnabled = true;
  monsters[cnt].events.onInputOver.add(onOver, this);
  monsters[cnt].name = ["goblin", 1, "1 Red Archer"];
  monsters[cnt].scale.setTo(1.5,1.5);

  var style = {font: "10px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: monsters[cnt].width, align: "center"};

  textArray[cnt] = game.add.text(0, 0, "HP: 3", style);
  textArray[cnt].anchor.set(0.5);
}

function update() {

  text.x = Math.floor(s.x + s.width / 2);
  text.y = Math.floor(s.y + 0 * s.height / 2);

  for (var i = 1; i < monsters.length; i++) {
    textArray[i].x = Math.floor(monsters[i].x + monsters[i].width / 2);
    textArray[i].y = Math.floor(monsters[i].y + 0 * monsters[i].height / 2);
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
{
    s.x -= 1;
    console.log(s.worldPosition);
}
else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
{
    s.x += 1;
    console.log(s.worldPosition);
}

if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
{
    s.y -= 1;
    console.log(s.worldPosition);
}
else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
{
    s.y += 1;
    console.log(s.worldPosition);
}


}
