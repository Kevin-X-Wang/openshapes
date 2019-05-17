function drawRect(toX, toY, context) {
    context.beginPath();
    context.fillStyle = currColor;
    context.fillRect(startX, startY, toX - startX, toY - startY);
    context.stroke();
}

function passParams(width, height){
    $.ajax({
      url: "/ImageMatch",
      type: "get", //send it through get method
      data: {
        Width: width,
        Height: height
      },
      success: function(response) {
        //Do Something
      },
      error: function(xhr) {
        //Do Something to handle error
      }
    });
}


$("#canvas2").mousemove(function(e){
    var offsetTop = this.getBoundingClientRect().top
    var offsetLeft = this.getBoundingClientRect().left
    var mouseX = e.pageX - offsetLeft;
    var mouseY = e.pageY - offsetTop;

    // Put your mousemove stuff here
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    drawRect(mouseX, mouseY, ctx2);
});

$("#canvas2").mouseup(function(e){
  var offsetTop = this.getBoundingClientRect().top
  var offsetLeft = this.getBoundingClientRect().left
  var mouseX = e.pageX - offsetLeft;
  var mouseY = e.pageY - offsetTop;
  paint = false;
  $("#canvas2").css({
        zIndex:-1
  });
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  drawRect(mouseX, mouseY, ctx);
  passParams(Math.abs(mouseX - startX), Math.abs(mouseY - startY));
})
