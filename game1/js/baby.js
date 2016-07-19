var babyObj = function() {
	this.x;
	this.y;
	this.angle;

	//尾巴
	this.babyTailTimer = 0; //时间间隔   
	this.babyTailCount = 0; //当前是第几章图片
	//眼睛
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	//身体
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
}
babyObj.prototype.draw = function() {

	//lerp x,y  这个函数使得一个值趋向一个值   使小鱼的坐标趋向于大鱼的坐标
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);

	//delta angle   Math.atan2(y,x)(这个是javascript中的函数api 反正切函数) 返回值是 pi ~  -pi
	var deltay = mom.y - this.y;
	var deltax = mom.x - this.x;
	var beta = Math.atan2(deltay, deltax) + Math.PI; //鼠标和大鱼之间的角度差  
	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//babytail count
	this.babyTailTimer += deltaTime;
	if (this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	//baby eye  count
	this.babyEyeTimer += deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if (this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random() * 1500 + 2000 //[2000,3500)
		} else {
			this.babyEyeInterval = 200;
		}
	}

	//baby boby 
	this.babyBodyTimer += deltaTime;
	if (this.babyBodyTimer > 300) {
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if (this.babyBodyCount > 19) {
			this.babyBodyCount = 19
			//game over
			data.gameOver = true;
		}
	}

	//ctx1
	ctx1.save();
	//translate()
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);

	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);

	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);

	ctx1.restore();
}