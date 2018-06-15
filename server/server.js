const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, isDuplicate} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit sends to single connected user
	// io.emit sends to every connected user
	// socket.brodcast.emit sends to everyone, except for current user

	socket.on('join', (params, callback) => {

		// Make room name case insensitive
		let validRoom = params.room.toLowerCase();

		// If user name already exists => reject
		let isDuplicate = (name) => {
			let userList = users.getUserList(validRoom);
			let validName = name.trim();
			if (userList.indexOf(validName) >= 0) {
				return true;
			}
		};

		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required.');
		} else if (isRealString(params.name) && isDuplicate(params.name)) {
			return callback('That name is already taken');
		};

		// if (!isRealString(params.name) && isDuplicate(params.name)) {
		// 	return callback('That name is already taken.');
		// };


		socket.join(validRoom);
		// When a user joins:
			// remove them from all other rooms
		users.removeUser(socket.id);
			// add them to the chosen room
		users.addUser(socket.id, params.name, validRoom);
			// emits the updated user list to the room
		io.to(validRoom).emit('updateUserList', users.getUserList(validRoom));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(validRoom).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));
		callback();
	});

	socket.on('createMessage', (message, callback) => {
		let user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}

		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		let user = users.getUser(socket.id);

		// If there is a user:
		if (user) {
			// emit location message only to the room the user is in, with their username
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});

	socket.on('disconnect', () => {
		let user = users.removeUser(socket.id);
		// If a user is removed:
		if (user) {
			// update the user list and emit list to room
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			// announce that user has left the room
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});


// Make chat room case insensitive, ie: lotr != LOTR != LotR
// Make user names unique
// Add list of currently active chatroom at login page
	// like the People list
	// dropdown between 'room name' and 'join' button