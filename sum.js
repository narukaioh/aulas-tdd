module.exports = function sum (first, second) {
	if (isNaN(first) || isNaN(second)) { return }
	return first + second;
}