/**
 *  Author by Vincent
 *  DATE 2015年10月30日
 */

var can1;
var can2;

var ctx1; //定义场景
var ctx2;

//获取canvas的尺寸
var canWidth;
var canHeight;

var lastTime;
var deltaTime;
//定义背景图片
var bgPic = new Image();
//定义海葵对象
var ane;

//定义果实对象
var fruit;

//定义大鱼对象
var mom;
//定义小鱼
var baby;
//定义鼠标的位置
var mx;
var my;

//定义小鱼相关的数组
var babyTail = [];
var babyEye = [];
var babyBody = [];

//定义大鱼相关数组
var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;
//定义白圈
var wave;
var halo;

//定义漂浮物
var dust;
var dustPic = [];

document.body.onload = game;

function game() {

	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();

}

function init() {
	//获取canvas context
	can1 = document.getElementById("canvas1"); //fishes,dusts,UI,circle
	ctx1 = can1.getContext("2d");

	can2 = document.getElementById("canvas2"); //bacj=kground ,ane, friuits
	ctx2 = can2.getContext("2d");

	can1.addEventListener("mousemove", onMouseMove, false);
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	bgPic.src = "src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;
	//console.log(canWidth + " " + canHeight);

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	//小鱼相关资源的定义
	for (var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "src/babyTail" + i + ".png";
	}
	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "src/babyEye" + i + ".png";
	}
	for (var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "src/babyFade" + i + ".png";
	}
	//大鱼相关的资源定义
	for (var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = "src/bigTail" + i + ".png";
	}
	for (var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src = "src/bigEye" + i + ".png"
	}
	for (var i = 0; i < 8; i++) {
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "src/bigSwim" + i + ".png";
		momBodyBlue[i].src = "src/bigSwimBlue" + i + ".png";
	}

	//分值计算
	data = new dataObj();

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for (var i = 0; i < 7; i++) {
		dustPic
	}
	
	for (var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}
	dust = new dustObj;
	dust.init();
}

function gameloop() {

	window.requestAnimFrame(gameloop); //setInterval,setTimeout frame per second
	//console.log("loop")
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	//console.log(deltaTime)
	if (deltaTime > 40) deltaTime = 40; //避免当不在当前页面上时 帧与帧之间的间隔过大

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	baby.draw();

	momFruitsCollision();
	momBabyCollision();

	//分数绘制
	data.draw();
	wave.draw();
	halo.draw();
	
	dust.draw();
}

function onMouseMove(e) {
	if (!data.gameOver) {
		if (e.offsetX || e.layerX) {
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}
}