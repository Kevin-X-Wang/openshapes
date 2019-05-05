var folder = "../images/";

module.exports={
  matchDims: function (dimRatio){
    var files = fs.readdirSync(folder);
    console.log(files);
  }
}
