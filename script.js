var inputTimeout;

$(document).ready(function() {


	$('#queryBox').on('input', function() {
	
		clearTimeout(inputTimeout);
		inputTimeout = setTimeout(doQueryResult, 250);
	});

	$('#queryBox').focus();
});

function doQueryResult()
{
	var queryResult;
	var queryText = $("#queryBox").val().replace(' ', '');

	try
	{
		queryResult = evaluate(queryText);

		$("#resultText").text("= " + queryResult);
	}
	catch (e)
	{
		$("#resultText").text("");
	}
}
