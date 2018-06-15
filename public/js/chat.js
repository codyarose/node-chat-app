let socket = io();

// Scrolls the page to the bottom when new messages are posted, unless
// user has scrolled up higher than the height of a message
function scrollToBottom() {
	// Selectors
	let messages = jQuery('#messages');
	let newMessage = messages.children('li:last-child');
	// Heights
	let clientHeight = messages.prop('clientHeight');
	let scrollTop = messages.prop('scrollTop');
	let scrollHeight = messages.prop('scrollHeight');
	let newMessageHeight = newMessage.innerHeight();
	let lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

// Grabs the search params from the browser and translates them into an object
// Emits 'join' to server with the params object
socket.on('connect', function() {
	let params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function(err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	});
});

socket.on('updateUserList', function(users) {
	let ol = jQuery('<ol></ol>');

	users.forEach(function (user) {
		ol.append(jQuery('<li></li>').text(user));
	});

	jQuery('#users').html(ol);
});

// Logs when disconnected from server
socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// When a new message is created it is appended to the #messages container in html
// scrollToBottom called to update user view
socket.on('newMessage', function (message) {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

// Same as above but for the location messages
socket.on('newLocationMessage', function (message) {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#location-message-template').html();
	let html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

// Prevents the Send button refreshing entire page
// Creates message then sets message input box back to empty
jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	let messageTextbox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val('');
	});
});

// Send location button
// When clicked it uses the browser's navigator.geolacation api
// 		to get the lat/long coords for the createLocationMessage function
// When clicked the button is disabled and text changed, then after the
//		geolocator runs it re-enables the button and reverts text. This is to
// 		prevent confusion because the geolocator takes a few seconds to respond
// 		with the results, and to prevent spamming.
let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});