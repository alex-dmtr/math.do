var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var port = 3005;
app.listen(3005, function () {
  console.log('Example app listening on port ' + port);
});