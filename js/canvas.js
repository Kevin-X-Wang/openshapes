//paint code courtesy of William Malone
//http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

//initializing context and necessary vars
ctx = document.getElementById('image-canvas').getContext("2d");
var canvasWidth = ctx.canvas.clientWidth;
var canvasHeight = ctx.canvas.clientHeight;

ctx2 = document.getElementById('canvas2').getContext("2d");

var currX, currY, prevX, prevY, startX, startY;
var paint = false;
var out = false;
var currColor = "#7ec0ee";
var currTool = "brush";
var toolArray = ["brush", "bucket", "bound", "eraser"]
var colorArray = ["#7ec0ee", "#838b8b", "#8b7355", "#ffebcd", "#0000ff",
"#458b00", "#fcfcfc", "#fff8dc", "#7d7d7d", "#8b6508"]

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
        currColor = colorArray[$('a.active').index()];
      //console.log($('a.active').index())
    });
    }

    var tools = document.getElementById("draw").querySelector("#paint-tools");
    //console.log(header.length)
    var btns = tools.getElementsByTagName('a');

  //setting the clear button
  var clear = tools.getElementsByTagName('b');
  clear[0].addEventListener("click", function(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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

//what to do on mousedown, mousemove, etc
$('#image-canvas').mousedown(function(e){
  paint = true;
  var offsetTop = this.getBoundingClientRect().top
  var offsetLeft = this.getBoundingClientRect().left
  prevX = currX;
  prevY = currY;
  currX = e.pageX - offsetLeft;
  currY = e.pageY - offsetTop;
  if(currTool == "bound"){
    ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    startX = currX;
    startY = currY;
    $("#canvas2").css({
        zIndex:2
    });
  }
  else{
    draw();
  }
});

$('#image-canvas').mousemove(function(e){
  var offsetTop = this.getBoundingClientRect().top
  var offsetLeft = this.getBoundingClientRect().left
  prevX = currX;
  prevY = currY;
  currX = e.pageX - offsetLeft;
  currY = e.pageY - offsetTop;
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