var express = require('express');
var app = express();
var port = 3001;

app.use(express.static('public'));

app.use('/static', express.static(__dirname  + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// app.get('/hello', function (req, res) {
// 	res.send("hello. is it me you're looking for?");
// });

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});