"use strict";
new p5();

const WIDTH = 1200, HEIGHT = 800;

let canvas;

function setup() {
	canvas = createCanvas(WIDTH, HEIGHT);
	canvas.parent('#canvasParent');
}

function draw() {
	background(200);

	textAlign(CENTER);
	textSize(50);
	text('No image', width / 2, height / 2);
}