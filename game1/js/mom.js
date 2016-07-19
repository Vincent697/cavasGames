/**
 * Author by Vincent
 * Date : 2015年10月30日
 */
var momObj = function() {
	this.x;
	this.y;
	this.angle; //定义角度

	//尾巴
	this.momTailTimer = 0; //时间间隔   
	this.momTailCount = 0; //当前是第几章图片

	//眼睛
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	//身体
	this. momBodyCount = 0;

}
momObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}
momObj.prototype.draw = function() {

	//lerp x,y  这个函数使得一个值趋向一个值
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	//delta angle   Math.atan2(y,x)(这个是javascript中的函数api 反正切函数) 返回值是 pi ~  -pi
	var deltay = my - this.y;
	var deltax = mx - this.x;
	var beta = Math.atan2(deltay, deltax) + Math.PI; //鼠标和大鱼之间的角度差  
	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//Tail
	this.momTailTimer += deltaTime;
	if (this.momTailTimer > 50) {
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	//Eye
	this.momEyeTimer += deltaTime;
	if (this.momEyeTimer > this.momEyeInterval) {
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;

		if (this.momEyeCount == 0) {
			this.momEyeInterval = Math.random() * 1500 + 2000 //[2000,3500)
		} else {
			this.momEyeInterval = 200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);

	var momBodyCount = this.momBodyCount;
	if (data.double == 1) { //orange
		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
	} else {
		ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);

	}


	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);

	ctx1.restore();
}