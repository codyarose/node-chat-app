const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		// store res in variable
		// assert from matches value passed in
		// assert text matches
		// assert createdAt is number
		let from = 'Name';
		let text = 'Message body';
		let message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message.from).toBe(from);
		expect(message.text).toBe(text);
	});
});