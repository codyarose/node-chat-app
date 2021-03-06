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
	isUniqueUser (room, name) {
		let roomUsersList = this.getUserList(room);
		let duplicated = roomUsersList.filter((user) => user === name);

		return duplicated.length ? false : true;
	}
	getRoomList () {
		let users = this.users.filter((user) => {
			return user.room;
		});

		let rooms = users.map((user) => {
			return user.room;
		});

		return rooms;
	};
}

module.exports = {Users};