"use strict";

var settings = require('./settings.json');
var stringDistance = require('./levenshtein.js').getEditDistance;

function getClosestString(input, strings) {
	if (strings == null || strings.length == 0)
		throw 'Empty strings dictionary';

	input = input.toLowerCase();
	strings = strings.map((item) => (item.toLowerCase()));

	var matchDistance = strings.map((item) => ({name: item, distance: stringDistance(input, item)}));

	matchDistance.sort((a, b) => (a.distance > b.distance));

	var minDistance = matchDistance[0].distance;
	if (!(1 - minDistance / input.length >= settings.stringMatchPercent) || 
	 (strings.length > 1 && minDistance == matchDistance[1].distance))
		return null;
	else
		return matchDistance[0].name;
}

function findToken(tokens, start, end, token) {
	var i = end-1;

	while (i >= start)
	{
		if (tokens[i] == token)
			return i;
		i--;
	}

	return -1;
};


function parseTokens(expression) {
	var tokens = [];



	var currentToken = '';

	expression = expression.trim();

	for (var i = 0; i < expression.length; i++)
	{
		if (settings.delimiters.indexOf(expression[i]) != -1)
		{
			if (currentToken != '')
				tokens.push({text:currentToken});
			currentToken = '';
		}
		else if (settings.specialCharacters.indexOf(expression[i]) != -1)
		{
			if (currentToken != '')
				tokens.push({text:currentToken});
			tokens.push({text:expression[i]}	);
			currentToken = '';	
		}
		else
		{
			currentToken = currentToken + expression[i];
		}
	}

	if (currentToken != '')
		tokens.push({text:currentToken});

	return tokens;
}

module.exports = {
	getClosestString: getClosestString,
  parseTokens: parseTokens
}