//paint code courtesy of William Malone
//http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

ctx = document.getElementById('image-canvas').getContext("2d");
var canvasWidth = ctx.canvas.clientWidth;
var canvasHeight = ctx.canvas.clientHeight;

var currX, currY, prevX, prevY;
var paint = false;
var out = false;
var currColor = "#7ec0ee";
var currTool = "brush";
var toolArray = ["brush", "bucket", "eraser"]
var colorArray = ["#7ec0ee", "#838b8b", "#8b7355", "#ffebcd", "#0000ff",
                  "#458b00", "#fcfcfc", "#fff8dc", "#7d7d7d", "#8b6508"]

function initMenu(){
  var menu = document.getElementById("draw").querySelector("#vertical-menu");
    //console.log(header.length)
  var btns = menu.getElementsByTagName('a');
  //console.log(btns)
    //console.log(btns.length)
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active"); 
      current[0].className = current[0].className.replace("active", "");
      this.className += " active";
      currColor = colorArray[$('a.active').index()]
      //console.log($('a.active').index())
    });
  }

  var tools = document.getElementById("draw").querySelector("#paint-tools");
    //console.log(header.length)
  var btns = tools.getElementsByTagName('a');
  var uncl = tools.getElementsByTagName('b');
  uncl[1].addEventListener("click", function() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  });
  //console.log(btns)
    //console.log(btns.length)
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active-tool"); 
      current[0].className = current[0].className.replace("active-tool", "");
      this.className += " active-tool";
      currTool = toolArray[($('a.active-tool').index())]
    });
  }
}

function draw(){
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canva

  if(paint && currTool == "brush") {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = currColor;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.closePath();
  }
  else if(paint && currTool == "eraser") {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.closePath();
  }
}

$('#image-canvas').mousedown(function(e){
	var offsetTop = this.getBoundingClientRect().top
	var offsetLeft = this.getBoundingClientRect().left
	paint = true;
  prevX = currX;
  prevY = currY;
  currX = e.pageX - offsetLeft;
  currY = e.pageY - offsetTop;
	//addClick(e.pageX - offsetLeft, e.pageY - offsetTop);
	draw();
});

$('#image-canvas').mousemove(function(e){
	var offsetTop = this.getBoundingClientRect().top
	var offsetLeft = this.getBoundingClientRect().left
  prevX = currX;
  prevY = currY;
  currX = e.pageX - offsetLeft;
  currY = e.pageY - offsetTop;
	//addClick(e.pageX - offsetLeft, e.pageY - offsetTop, true);
	draw();
	
});

$('#image-canvas').mouseup(function(e){
	paint = false;
});

$('#image-canvas').mouseleave(function(e){
	paint = false;
});
