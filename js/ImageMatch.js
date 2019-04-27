function imageMatch(){
  /*
  var img = new Image();
  var imgWidth = img.height;
  var imgHeight = img.width;
  ratio = imgWidth/imgHeight;
  bound = 0.1 * ratio
  */
    dir = "../templates/"
    var extension = ".svg"
    $.ajax({
        url: dir,
        type: "Get",
        async: false,
        success: function (data) {
          $(data).find("a:contains(.png)").each(function(){
            console.log(data)
          });
        }
    });
};
