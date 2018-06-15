// Checks that str is a string and it's not empty after trimming
let isRealString = (str) => {
	return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};