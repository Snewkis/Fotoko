"use strict";
new p5();

const WIDTH = 1200, HEIGHT = 800;

let canvas;
let img, imgMode;

$('#openImageBtn').change(() => {
	const file = document.getElementById('openImageBtn').files[0];
	const reader = new FileReader();

	reader.onloadend = () => {
		img = loadImage(reader.result, () => {
			resizeCanvas(img.width, img.height);
		});
  	}

  	if (file) {
    	reader.readAsDataURL(file);
  	}
});

$('#saveToolBarBtn').click(() => {
	if (img == null) {
		alert('No image');
		return;
	}

	let ext = prompt('File extension (jpg, png) :')

	if (ext) {
		saveCanvas(canvas, 'Fotoko', ext);
	}
});

$('#defaultToolBarColor').click(() => imgMode = null);
$('#grayToolBarColor').click(() => imgMode = GRAY);
$('#invertToolBarColor').click(() => imgMode = INVERT);
$('#erodeToolBarColor').click(() => imgMode = ERODE);
$('#dilateToolBarColor').click(() => imgMode = DILATE);

function setup() {
	canvas = createCanvas(WIDTH, HEIGHT);
	canvas.id('canvas');
	canvas.parent('#canvasParent');
}

function draw() {
	background(200);

	if (img == null) {
		textAlign(CENTER);
		textSize(50);
		text('No image', width / 2, height / 2);
	} else {
		image(img, 0, 0);
		if (imgMode) {
			filter(imgMode);
		}
	}
}