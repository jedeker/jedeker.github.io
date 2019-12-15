var canvas = document.getElementById('bg-canvas');
var ctx = canvas.getContext('2d');


const cs = 50;
class Circle {
	constructor(x, y, offset) {
		this.approach_circle = 200;
		this.x = x;
		this.y = y;
		this.offset = offset;
	}
	
	draw() {
		ctx.lineWidth = 4;	
		
		if (this.offset <= 0 && this.approach_circle > cs) {
			ctx.strokeStyle = 'rgba(135, 206, 235, .5)';	
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.approach_circle, 0, 2 * Math.PI);
			ctx.stroke();
			
			ctx.strokeStyle = 'rgb(135, 206, 235, 1)';
			ctx.beginPath();
			ctx.arc(this.x, this.y, cs, 0, 2 * Math.PI);
			ctx.stroke();
		} else if (Math.abs(this.approach_circle - cs) < 4) {
			var grd = ctx.createRadialGradient(this.x, this.y, cs / 2.0, this.x, this.y, cs);
			grd.addColorStop(0, 'rgba(135, 206, 235, .2)');
			grd.addColorStop(.5, 'rgba(135, 206, 235, .1)');
			grd.addColorStop(1, 'rgba(135, 206, 235, .0)');
			
			ctx.fillStyle = grd;
			ctx.beginPath();
			ctx.arc(this.x, this.y, cs, 0, 2 * Math.PI);
			ctx.fill();
		}
		
	}
	
	update() {
		if (this.offset <= 0) {
			this.approach_circle = this.approach_circle - 1.8;
		} else {
			this.offset--;
		}
	}
}

const circles = [];

function init() {

	circles.push(new Circle((window.innerWidth - 400) * Math.random() + 200, (window.innerHeight - 400) * Math.random() + 200, 0));
	for (var i = 1; i < 5; i++) {
		var x, y;
		do {
			x = (window.innerWidth - 400) * Math.random() + 200;
			y = (window.innerHeight - 400) * Math.random() + 200;
		} while (Math.hypot(circles[i - 1].x - x, circles[i - 1].y - y) > 300 || 100 > Math.hypot(circles[i - 1].x - x, circles[i - 1].y - y));
		circles.push(new Circle(x, y, 50 * i));
	}
	
	window.requestAnimationFrame(draw);
}

function draw() {
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	
	
	ctx.clearRect(0,0, canvas.width, canvas.height);

	for (const c of circles) {
		c.draw();
		c.update();
	}
	
	window.requestAnimationFrame(draw);
}

init();