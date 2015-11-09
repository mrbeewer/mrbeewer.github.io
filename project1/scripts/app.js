var canvas = CE.defines("canvas_id").ready(function() {

  canvas.Scene.call("MyScene");

});

canvas.Scene.New({
  name: "MyScene", // Need this!
  materials: { // loads images, sounds, videos see materials.load()
    images: {
            // For CanvasEngine load "bar" first, we add index property
            "main": "https://github.com/mrbeewer/mrbeewer.github.io/blob/master/project1/styles/circle.png?raw=true"
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
  }

});
//
// canvas.Scene.call("MyScene")


/**
    Example to create a progress bar
*/

// var canvas = CE.defines("canvas_id").
// 		ready(function() {
// 			canvas.Scene.call("MyScene");
//         });
//
// canvas.Scene.new({
// 	name: "MyScene",
// 	materials: {
//         // Usually put relatives links
// 		images: {
//             // For CanvasEngine load "bar" first, we add index property
//             "bar": {path: "http://rsamaium.github.io/CanvasEngine/samples/preload/images/bar_full.jpg", index: 0},
//             "1": "http://rsamaium.github.io/CanvasEngine/samples/preload/images/1.jpg",
//             "2": "http://rsamaium.github.io/CanvasEngine/samples/preload/images/2.jpg",
//             "3": "http://rsamaium.github.io/CanvasEngine/samples/preload/images/3.jpg"
// 		}
// 	},
// 	called: function(stage) {
//         // Initialize an element
// 		this.el = this.createElement();
// 		stage.append(this.el);
// 	},
// 	preload: function(stage, pourcent, material) {
// 		this.el.drawImage("bar", 0, 0, pourcent + "%");
// 	},
// 	ready: function(stage) {
//         // use stage.empty() for clear stage
// 	}
// });
