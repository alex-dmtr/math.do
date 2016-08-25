var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
	// var text = encodeURIComponent(request.params.text);
	var text = request.query.text;

	try
	{
		var result = global.core.evaluateInput(text);
		response.send(result);
	}
	catch (e)
	{
		response.send(e);
	}
		
});

module.exports = router;