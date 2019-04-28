var fs = require('fs');
var folder = "../images/";

function matchDims(dimRatio){
  var files = fs.readdirSync(folder);
  console.log(files)
}
