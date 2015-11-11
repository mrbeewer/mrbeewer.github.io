var canvas = CE.defines("canvas_id").extend(Animation).ready(function() {

  canvas.Scene.call("MyScene");
});

var timeline;

canvas.Scene.New({
  name: "MyScene", // Need this!
  materials: { // loads images, sounds, videos see materials.load()
    images: {
            // For CanvasEngine load "bar" first, we add index property
            "main": "https://github.com/mrbeewer/mrbeewer.github.io/blob/master/project1/styles/map-with-circles.png?raw=true",
            "piece":
            "https://github.com/mrbeewer/mrbeewer.github.io/blob/master/project1/styles/triangle.png?raw=true",
		}
  },
  // all these methods are optional

  called: function(stage) {
    // initialize an element
    this.el = this.createElement();
    stage.append(this.el);
  },

  preload: function(stage, pourcent, material) {
    this.el.drawImage("main", 0, 0, pourcent + "%");
  },

  ready: function(stage, params) {
    // use stage.empty() for clear stage
    var element = this.createElement();
    element.x = 100;
    element.y = 50;
    element.scaleX = 0.5;
    element.scaleY = 0.5;
    element.drawImage("piece");
    stage.append(element);

    // Easing name : http://gsgd.co.uk/sandbox/jquery/easing/
    timeline = canvas.Timeline.new(element);

    timeline.to({
        x: 200,
        y: 100,
    }, 100, Ease.easeInOutElastic).call();
  }

});

// timeline.add({x: 2}, 60).loop();
