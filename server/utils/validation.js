const {Users} = require('./users');

// Checks that str is a string and it's not empty after trimming
let isRealString = (str) => {
	return typeof str === 'string' && str.trim().length > 0;
};

// Checks that user name doesn't already exist
let isDuplicate = (name, params) => {
	let userList = Users.getUserList(params.room);
	if (userList.indexOf(name) < 0) {
		return true;
	}
};

module.exports = {isRealString, isDuplicate};