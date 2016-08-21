var express = require('express');
var app = express();
var port = 3001;

app.use(express.static('public'));

app.use('/static', express.static(__dirname  + '/public'));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/:query', function(request, response) {
	var queryText = request.params.query;


	var utils = require(__dirname + '/scripts/utils.js');
	var mathops = require(__dirname + '/scripts/mathops.js');

	// console.log(queryText);
	try
	{
		queryText = queryText.split(' ').join('');
		queryResult = mathops.evaluate(queryText);
		
		response.send("= " + queryResult);
		// $("#resultText").text("= " + queryResult);
		// $("#resultText").text("= " + queryResult);
	}
	catch (e)
	{
		response.send(e);
		// $("#resultText").text(e);
	}
		
});

// app.get('/hello', function (req, res) {
// 	res.send("hello. is it me you're looking for?");
// });

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});