var folder = "../images/";

function matchDims(dimRatio){
  var bound = dimRatio * 0.1
  $.ajax({
      url : folder,
      success: function (data) {
          $(data).find("a").attr("href", function (i, val) {
              if( val.match(/\.(svg)$/) ) {
                  console.log(folder + val)
              }
          });
      }
  });
}
