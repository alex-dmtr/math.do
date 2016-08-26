
function addComplex(a, b) {
	return a + b;
}

function subtractComplex(a, b) {
	return a -b;
}

function inverseComplex(x) {
	return -x;
}

function getCoefficient(polynomial, power, variable) {
	var value = polynomial.value;
	var result;
	if (power == 0)
		result = value["0"];
	else {
		if (value[variable]) {
			if (value[variable][power.toString()])
				result =  value[variable][power.toString()];
			else
				result = 0;
		}
		else
			result = 0;
	}

	return result;
}

function setCoefficient(polynomial, power, variable, value) {

	if (power == '0')
		polynomial.value["0"] = value;
	else
	{
		if (!polynomial[variable])
			polynomial[variable] = {};
		polynomial[variable][power.toString()] = value;
	}
}

function magic(__a, __b, apply) {

}
module.exports = {

	add: function(_a, _b) {
		var a = _a.value, b = _b.value;
		// console.log(a, b);
		var value = {};
		var key, key2;
		for (key in Object.keys(a)) {
			value[key] = a[key];
		}
		// console.log(b);
		for (key in Object.keys(b)) {
			// console.log(key, b[key]);
			if (!value.hasOwnProperty(key))
				value[key] = b[key];
			else {
				if (key == "0") {
					value[key] = addComplex(value[key], b[key]);
				}
				else {
					for (key2 in Object.keys(b[key])) {
						// var key2 = Object.keys[b[key]][j];
						if (!value.hasOwnProperty(key)) value[key] = {};
						if (value[key].hasOwnProperty(key2))
							value[key][key2] = addComplex(value[key][key2], b[key][key2]);
						else
							value[key][key2] = b[key][key2];

					}
				}
			}
		}

		return { type: "polynomial", value: value} ;
	},

	subtract: function(_a, _b) {
		var a = _a.value, b = _b.value;
		console.log(a, b);
		var value = {};
		var key, key2;
		for (key in Object.keys(a)) {
			value[key] = a[key];
		}

		// console.log(b);
		for (key in Object.keys(b)) {
			if (value[key] == null)
				value[key] = inverseComplex(b[key]);
			else {
				if (key == "0") {
					value[key] = subtractComplex(value[key], b[key]);
				}
				else {
					for (key2 in Object.keys(key)) {
						var key2 = Object.keys[b[key]][j];

						if (!value[key]) value[key] = {};
						if (value[key][key2])
							value[key][key2] = subtractComplex(value[key][key2], b[key][key2]);
						else
							value[key][key2] = inverseComplex(b[key][key2]);

					}
				}
			}
		}

		return { type:"polynomial", value: value};
	},

	multiply: function(_a, _b) {
		return { type: "polynomial", value: value} ;
	},

	divide: function(_a, _b) {
		return { type: "polynomial", value: value} ;
	},

	power: function(_a, _b){
		return { type: "polynomial", value: value} ;
	}
}