//paint code courtesy of William Malone
//http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

//initializing context and necessary vars
ctx = document.getElementById('image-canvas').getContext("2d");
var canvasWidth = ctx.canvas.clientWidth;
var canvasHeight = ctx.canvas.clientHeight;

var currX, currY, prevX, prevY;
var paint = false;
var out = false;
var currColor = "#7ec0ee";
var currTool = "brush";
var toolArray = ["brush", "bucket", "bound", "eraser"]
var colorArray = ["#7ec0ee", "#838b8b", "#8b7355", "#ffebcd", "#0000ff",
"#458b00", "#fcfcfc", "#fff8dc", "#7d7d7d", "#8b6508"]

var clickX = [];
var clickY = [];
var clickDrag = [];
var clickColor = [];

var finalX = [];
var finalY = [];
var finalDrag = [];
var finalColor = [];
var paint;


function undo(){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  var l = finalX.length;
  
  if(l > 0){
    for(var i=0; i < finalX.length; i++) {    
      ctx.beginPath();
      if(finalDrag[i] && i){
        ctx.moveTo(finalX[i-1], finalY[i-1]);
      }
      else{
        ctx.moveTo(finalX[i]-1, finalY[i]);
      }
      ctx.lineTo(finalX[i], finalY[i]);
      ctx.strokeStyle = finalColor[i];
      ctx.closePath();
      ctx.stroke();
    }
  }
}

//function to initialize the buttons on the menu and the tools
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

  //setting the clear button
  var clear = tools.getElementsByTagName('b');
  clear[0].addEventListener("click", function(){
    undo();
    clickX = [];
    clickY = [];
    clickDrag = [];
    clickColor = [];
  })
  clear[1].addEventListener("click", function(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    clickX = [];
    clickY = [];
    clickDrag = [];
    clickColor = [];
    finalX = [];
    finalY = [];
    finalDrag = [];
    finalColor = [];
  })
  //console.log(btns)
    //console.log(btns.length)
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active-tool"); 
        current[0].className = current[0].className.replace("active-tool", "");
        this.className += " active-tool";
        currTool = toolArray[$('a.active-tool').index()]
      //console.log($('a.active').index())
    });
    }
  }

//function to draw on canvas based on the current tool 
function draw(){
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canva

  if(paint && currTool == "brush") {
    ctx.beginPath();
    if(!out){
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = currColor;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.closePath();
    }
    else{
      ctx.moveTo(currX, currY);
      ctx.strokeStyle = currColor;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.closePath();
      out = false;
    }
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

//function to save current movements
function addClick(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if(currTool == "eraser"){
    clickColor.push("#ffffff");
  }
  else{
    clickColor.push(currColor);
  }
}

//what to do on mousedown, mousemove, etc
$('#image-canvas').mousedown(function(e){
  finalY = finalY.concat(clickY);
  finalX = finalX.concat(clickX);
  finalDrag = finalDrag.concat(clickDrag);
  finalColor = finalColor.concat(clickColor);

  clickY = [];
  clickX = [];
  clickDrag = [];
  clickColor = [];


  var offsetTop = this.getBoundingClientRect().top
  var offsetLeft = this.getBoundingClientRect().left
  paint = true;
  prevX = currX;
  prevY = currY;
  currX = e.pageX - offsetLeft;
  currY = e.pageY - offsetTop;
  addClick(e.pageX - offsetLeft, e.pageY - offsetTop);
  draw();
});

$('#image-canvas').mousemove(function(e){
  var offsetTop = this.getBoundingClientRect().top
  var offsetLeft = this.getBoundingClientRect().left
  prevX = currX;
  prevY = currY;
  currX = e.pageX - offsetLeft;
  currY = e.pageY - offsetTop;
  if(paint && !out){
    addClick(e.pageX - offsetLeft, e.pageY - offsetTop, true);
  }
  draw();
});

$(document).mousedown(function(e){
  if(!paint){
    paint = true;
    out = true;
  }
});

$(document).mouseup(function(e){
  paint = false;
});

$('#image-canvas').mouseleave(function(e){
	out = true;
});
