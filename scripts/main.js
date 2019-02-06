"use strict";
new p5();

const WIDTH = 1200, HEIGHT = 800;

let canvas;
let img, imgMode, intensity;

$('#openImageBtn').change(() => {
	const file = document.getElementById('openImageBtn').files[0];
	const reader = new FileReader();

	reader.onloadend = () => {
		img = loadImage(reader.result, () => {
			if (img.width > 1920 || img.height > 1200) {
				alert('Img too big ! Sorry');
				img = null;
			} else {
				resizeCanvas(img.width, img.height);
			}
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

	let ext = prompt('File extension (jpg, png) :');

	if (ext) {
		saveCanvas(canvas, 'Fotoko', ext);
	}
});

$('#defaultToolBarColor').click(() => imgMode = null);
$('#grayToolBarColor').click(() => imgMode = GRAY);
$('#invertToolBarColor').click(() => imgMode = INVERT);
$('#erodeToolBarColor').click(() => imgMode = ERODE);
$('#dilateToolBarColor').click(() => imgMode = DILATE);
$('#thresholdToolBarColor').click(() => {
	let _intensity = prompt('Threshold intensity (0 to 1) :');

	intensity = _intensity;
	imgMode = THRESHOLD;
});
$('#posterizeBarColor').click(() => {
	let _intensity = prompt('Posterize intensity :');

	intensity = _intensity;
	imgMode = POSTERIZE;
});
$('#blurBarColor').click(() => {
	let _intensity = prompt('Blur intensity :');

	intensity = _intensity;
	imgMode = BLUR;
});

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

		if (imgMode && intensity) {
			filter(imgMode, intensity);
		} else if (imgMode) {
			filter(imgMode);
		}
	}
}