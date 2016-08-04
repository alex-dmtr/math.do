function findOperator(expression, operator)
{
	var paranthesisLevel = 0;

	var i = expression.length-1;

	while (i >= 0)
	{
		if (expression[i] == ')')
			paranthesisLevel++;
		else if (expression[i] == '(')
			paranthesisLevel--;
		else if (expression[i] == operator && paranthesisLevel == 0)
			return i;
		i--;
	}

	return -1;
}

function evaluate(expression)
{
	var _plus = findOperator(expression, '+');
	var _minus = findOperator(expression, '-');
	var _mult = findOperator(expression, '*');
	var _div = findOperator(expression, '/');
	var _pow = findOperator(expression, '^');

	var left_result, right_result;
	var result;

	if (_plus != -1 || _minus != -1)
	{
		if (_plus > _minus)
		{
			left_result = evaluate(expression.slice(0, _plus));
			right_result = evaluate(expression.slice(_plus+1, expression.length));
			result = left_result + right_result;
		}
		else
		{
			if (_minus != 0)
			{
				left_result = evaluate(expression.slice(0, _minus));
				right_result = evaluate(expression.slice(_minus+1, expression.length));
				result = left_result - right_result;
			}
			else
			{
				result = 0 - evaluate(expression.slice(_minus+1, expression.length));
			}
		}
	}
	else if (_mult != -1 || _div != -1)
	{
		if (_mult > _div)
		{
			left_result = evaluate(expression.slice(0, _mult));
			right_result = evaluate(expression.slice(_mult+1, expression.length));
			result = left_result * right_result;
		}
		else
		{
			left_result = evaluate(expression.slice(0, _div));
			right_result = evaluate(expression.slice(_div+1, expression.length));
			result = left_result / right_result;
		}
	}
	else if (_pow != -1)
	{
		left_result = evaluate(expression.slice(0, _pow));
		right_result = evaluate(expression.slice(_pow+1, expression.length));

		return Math.pow(left_result, right_result);
	}
	else if (expression[0] == '(' && expression[expression.length-1] == ')')
	{
		result = evaluate(expression.slice(1, expression.length-1));
	}
	else if (expression.includes('(') || expression.includes(')') || expression.length == 0)
	{
		throw "invalid expression";
	}
	else
	{	
		result = parseFloat(expression);
	}

	return result;
}
