const moment = require('moment');


// let date = moment();
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am
// 6:01 am

let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));