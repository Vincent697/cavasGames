/**
 * Author by Vincent
 */
//定义一个类   果实类
var fruitObj = function() {
	this.alive = []; //boolean
	this.x = [];
	this.y = [];
	this.aneNo=[];
	this.l = []; //定义果实的大小
	this.spd = []; //定义漂浮速度
	this.fruitType = []; //定义果实类型
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNo=[0];
		this.spd[i] = Math.random() * 0.017 + 0.003; //[0.003,0.02)
		this.fruitType[i] = "";
	}
	this.orange.src = "src/fruit.png";
	this.blue.src = "src/blue.png";
}
fruitObj.prototype.draw = function() {
	for (var i = 0; i < this.num; i++) {
		//draw
		//find an ane ,grow,fly up
		if (this.alive[i]) {

			if (this.fruitType[i] == "blue") {
				var pic = this.blue;
			} else {
				var pic = this.orange;
			}

			if (this.l[i] <= 14) {//graw
				var NO=this.aneNo[i];
				this.x[i]=ane.headx[NO];
				this.y[i]=ane.heady[NO];
				this.l[i] += this.spd[i] * deltaTime;
				//ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			} else {
				this.y[i] -= this.spd[i] * 7 * deltaTime;
				//ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			}
			ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			if (this.y[i] < 10) {
				this.alive[i] = false;
			}
		}
	}
}

fruitObj.prototype.born = function(i) {

	this.aneNo[i]=Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	//定义随机的食物颜色
	var ran = Math.random();
	if (ran < 0.2) {
		this.fruitType[i] = "blue" //orange blue
	} else {
		this.fruitType[i] = "orange" //orange blue
	}

}

//果实被吃掉
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}
//监视当前果实存活数
function fruitMonitor() {
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			num++;
		}
	}
	if (num < 15) {
		//send a fruit
		sendFruit();
		return;
	}
	//console.log("monitor is working!")
}

function sendFruit() {
		for (var i = 0; i < fruit.num; i++) {
			if (!fruit.alive[i]) {
				fruit.born(i);
				return;
			}
		}
	}
	/*
	fruitObj.prototype.update = function() {
		var num = 0;
		for (var i = 0; i < this.num; i++) {
			if (this.alive[i])
				num++;
		}
	}
	*/