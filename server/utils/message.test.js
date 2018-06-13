const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		// store res in variable
		// assert from matches value passed in
		// assert text matches
		// assert createdAt is number
		let from = 'Name';
		let text = 'Message body';
		let message = generateMessage(from, text);

		expect(message.from).toBe(from);
		expect(message.text).toBe(text);
		expect(typeof message.createdAt).toBe('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		// from, lat, long
		// expect from correct
		// createdAt is a number
		// url prop is what you'd expect given the input
		let from = 'Name';
		let latitude = 123;
		let longitude = 456;
		let url = 'https://www.google.com/maps?q=123,456';
		let message = generateLocationMessage(from, latitude, longitude);

		expect(message.from).toBe(from);
		expect(message.url).toBe(url);
		expect(typeof message.createdAt).toBe('number');
	});
});