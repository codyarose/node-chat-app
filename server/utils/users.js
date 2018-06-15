// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
	constructor() {
		this.users = [];
	}
	addUser(id, name, room) {
		let user = {id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser(id) {
		// return this.users.filter(user => user.id !== id);
		let user = this.getUser(id);

		if (user) {
			this.users = this.users.filter(user => user.id !== id);
		}

		return user;
	}
	getUser(id) {
		return this.users.filter(user => user.id === id)[0];
	}
	getUserList(room) {
		let users = this.users.filter((user) => user.room === room);
		let namesArray = users.map((user) => user.name);

		return namesArray;
	}
}


// class Person {
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription () {
// 		return `${this.name} is ${this.age} year(s) old.`;
// 	}
// }

// let me = new Person('Cody', 25);
// let description = me.getUserDescription();
// console.log(description);

module.exports = {Users};