function parseTokens(expression)
{
	var tokens = [];

	var special_characters = ['+', '-', '*', '/', '^', '=', '(', ')'];

	var delimiters = [' ', '\t'];

	var currentToken = '';

	expression = expression.trim();

	for (var i = 0; i < expression.length; i++)
	{
		if (delimiters.indexOf(expression[i]) != -1)
		{
			if (currentToken != '')
				tokens.push(currentToken);
			currentToken = '';
		}
		else if (special_characters.indexOf(expression[i]) != -1)
		{
			if (currentToken != '')
				tokens.push(currentToken);
			tokens.push(expression[i]);
			currentToken = '';	
		}
		else
		{
			currentToken = currentToken + expression[i];
		}
	}

	if (currentToken != '')
		tokens.push(currentToken);

	return tokens;
}

function findObject(objects, name)
{
	for (var i = 0; i < objects.length; i++)
		if (objects[i].name == name)
			return objects[i];

	return null;

}

function findToken(tokens, start, end, token)
{
	var i = end-1;

	while (i >= start)
	{
		if (tokens[i] == token)
			return i;
		i--;
	}

	return -1;
}

function evaluateTokens(tokens, start, end)
{
	var _of = findToken(tokens, start, end, "of");
	var _with = findToken(tokens, start, end, "with");
	var _equals = findToken(tokens, start, end, "=");
	var _colon = findToken(tokens, start, end, ":");
	var left_result, right_result;
	var result;

	if (_of != -1)
	{
		left_result = evaluateTokens(tokens, start, _of);
		right_result = evaluateTokens(tokens, _of+1, end);

		if (right_result[right_result.length-1] != ')')
			right_result = right_result + "()";
		result = right_result + "." + left_result + "()";
	}
	else if (_with != -1)
	{
		left_result = evaluateTokens(tokens, start, _with);
		right_result = evaluateTokens(tokens, _with+1, end);
	
		result = left_result + "({" + right_result + "})";
	}
	else if (_equals != -1)
	{
		left_result = evaluateTokens(tokens, start, _equals);
		right_result = evaluateTokens(tokens, _equals+1, end); 
	
		result = left_result + ":" + right_result;
	}
	else if (_colon != -1)
	{
		left_result = evaluateTokens(tokens, start, _equals);
		right_result = evaluateTokens(tokens, _equals+1, end); 
	
		result = left_result + ":" + right_result;
	}
	else
	{
		result = "";
		if (tokens.length >= 1)
		{
			for  (var i = start; i < end - 1; i++)
				result += tokens[i] + "," ;
			result += tokens[end-1];
		}
	}

	return result;
}

function square(params)
{
	var result = {};

	var side = null;
	if (params)
		side = params.side;

	result["side"] = side;

	if (side)
		result["area"] = function() {
			return { info: side * side};
		};
	else
		result["area"] = function() {
			return { info: "side ^ 2"};
		};

	if (side)
		result["perimeter"] = function() {

			return { info: side * 4};
		}
	else
		result["perimeter"] = function() {

			return { info: "side * 4"};
		}

	result["info"] = "In geometry, a square is a regular quadrilateral, which means that it has four equal sides and four equal angles (90-degree angles, or right angles). It can also be defined as a rectangle in which two adjacent sides have equal length.";
 
	return result;
}

function triangle(params)
{
	var result = {};

	var sides;
	if (params)
		sides = params.sides;

	result["sides"] = sides;

	if (sides)
	{
		result["area"] = function() {

			return { info: "See Heron's formula."};
		};

		result["perimeter"] = function() {

			return { info: sides[0] + sides[1] + sides[2]};
		}

	}
	else
	{
		result["area"] = function() {

			return { info: "See Heron's formula."};
		};

		result["perimeter"] = function() {

			return { info: "sum of sides"};
		}
	}
	result["info"] = "A triangle is a polygon with three edges and three vertices. It is one of the basic shapes in geometry.";
 
	return result;
}