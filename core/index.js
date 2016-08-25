var settings = require('./settings.json');
var dbObjects = require('./dbObjects.json');
var inputParsing = require('./inputParsing.js');
var mathops = require('./mathops.js');

function evaluateInput(input) {
  var tokens = inputParsing.parseTokens(input);

  var isTextCorrection = false;
  var inputObjects = [];
  var correctedText = null;
  tokens.forEach(function(token) {

    var isObject = false;
    if (settings.specialCharacters.indexOf(token.text) == -1) 
    {
      if (dbObjects.hasOwnProperty(token.text))
      {
        isObject = true;
        token.object = dbObjects[token.text];
      }
      else
      {
        var closestString = inputParsing.getClosestString(token.text, Object.keys(dbObjects));
        console.log(closestString);
        if (closestString != null && dbObjects.hasOwnProperty(closestString)) 
        {
          isObject = true;
          token.object = dbObjects[closestString];
          token.textCorrection = closestString;
          isTextCorrection = true;
        }
      }
    }

    if (isObject)
      inputObjects.push(token.object);
  });

  if (isTextCorrection) {

    correctedText = "";
    var correctedTokens = [];
    tokens.forEach(function(token) {
      if (token.textCorrection)
        correctedTokens.push(token.textCorrection);
      else
        correctedTokens.push(token.text);
    })

    correctedText = correctedTokens.join(' ');
  }

  var result = {
    tokens: tokens,
    inputObjects: inputObjects,
    correctedText: correctedText
  }
  return result;
};

module.exports = {
  evaluateInput: evaluateInput
};
