context = document.getElementById('image-canvas').getContext("2d");


function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < clickX.length; i++) {		
  	context.beginPath();
  	if(clickDrag[i] && i){
  		context.moveTo(clickX[i-1], clickY[i-1]);
  	}
  	else{
  		context.moveTo(clickX[i]-1, clickY[i]);
  	}
  	context.lineTo(clickX[i], clickY[i]);
  	context.closePath();
  	context.stroke();
  }
}

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

$('#image-canvas').mousedown(function(e){
	var offsetTop = this.getBoundingClientRect().top
	var offsetLeft = this.getBoundingClientRect().left
	var mouseX = e.pageX - offsetLeft;
	var mouseY = e.pageY - offsetTop;
	paint = true;
	addClick(e.pageX - offsetLeft, e.pageY - offsetTop);
	redraw();
});

$('#image-canvas').mousemove(function(e){
	if(paint){
		var offsetTop = this.getBoundingClientRect().top
		var offsetLeft = this.getBoundingClientRect().left
		addClick(e.pageX - offsetLeft, e.pageY - offsetTop, true);
		redraw();
	}
});

$('#image-canvas').mouseup(function(e){
	paint = false;
});

$('#image-canvas').mouseleave(function(e){
	paint = false;
});