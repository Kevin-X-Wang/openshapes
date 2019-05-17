var express = require('express');
var fs = require('fs');
var https = require('https');

app = express();
app.use('/', express.static(__dirname + '/'));

var path = "./templates/"
server.listen(process.env.PORT || 8080);

function imageMatch(dimRatio){
  fs.readdir(path, function(err, items) {
    for(var i = 0; i < items.length; i++){
      console.log(items[i]);
    }
  })
}

app.get('/ImageMatch', function(req, res){
  imageMatch(req.query.Width, req.query.Height);
  res.send("hrllo");
});

const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}

const server = https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log('server running at ' + port)
    })
