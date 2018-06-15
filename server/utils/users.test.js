const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	let users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Cody',
			room: 'Node Course'
		}, {
			id: '2',
			name: 'Jordyn',
			room: 'React Course'
		}, {
			id: '3',
			name: 'Apollo',
			room: 'Node Course'
		}]
	});

	it('should add new user', () => {
		let users = new Users();
		let user = {
			id: '123',
			name: 'Cody',
			room: 'VIEO'
		};
		let resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		let userId = '1';
		let user = users.removeUser(userId);

		expect(user.id).toEqual(userId);
		expect(users.users).toHaveLength(2);
	});

	it('should not remove user', () => {
		let userId = '99';
		let user = users.removeUser(userId);

		expect(user).toBeUndefined();
		expect(users.users).toHaveLength(3);
	});

	it('should find user', () => {
		let userId = '2';
		let user = users.getUser(userId);

		expect(user.id).toEqual(userId);
	});

	it('should not find user', () => {
		let userId = '99';
		let user = users.getUser(userId);

		expect(user).toBeUndefined();
	});

	it('should return names for node course', () => {
		let userList = users.getUserList('Node Course');

		expect(userList).toEqual(['Cody', 'Apollo']);
	});

	it('should return names for react course', () => {
		let userList = users.getUserList('React Course');

		expect(userList).toEqual(['Jordyn']);
	});
});