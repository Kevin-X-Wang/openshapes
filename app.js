var express = require('express');
var fs = require('fs');
var imagematch = require('./js/imagematch.js');

app = express();
app.use('/', express.static(__dirname + '/'));
app.listen(8080);
