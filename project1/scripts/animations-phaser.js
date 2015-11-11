// new Phaser.Game(width, height, )
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var s;
var text;

function callme() {
  s.x += 40;
}

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('einstein', 'images/orc.png');
    game.load.image("background", "styles/map-with-circles.png")
}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable

    // (x pos, y pos, key)
    var bng = game.add.sprite(0,0, 'background');
    bng.height = game.height;
    bng.width = game.width;

    var image = game.add.sprite(0, 0, 'einstein');
    image.name = ["goblin", 1, "1 Red Archer"];
    image.scale.setTo(0.5,0.5);

    image.inputEnabled = true; // DONT FORGET THIS!!

    image.events.onInputOver.add(onOver, this);

     s = image;
     s.events.onInputDown.add(onOver, this);
    game.physics.enable(image, Phaser.Physics.ARCADE);


    // text
    var style = {font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: s.width, align: "center"};

    text = game.add.text(0, 0, "HP: 3", style);
    text.anchor.set(0.5);
    //image.body.velocity.x=150;
    //update();
}

function onOver(sprite, pointer) {
  sprite.tint = 0xff7777;
  console.log(sprite.name[2]);
}

function update() {



  text.x = Math.floor(s.x + s.width / 2);
  text.y = Math.floor(s.y + s.height / 2);

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
{
    s.x -= 4;
}
else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
{
    s.x += 4;
}

if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
{
    s.y -= 4;
}
else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
{
    s.y += 4;
}
}
