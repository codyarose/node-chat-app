const _ = require('lodash');
const socketIO = require('socket.io');


var socket = io();

socket.on('roomList', function(roomList) {

    var list = _.uniq(roomList.roomList);
    console.log(list);

    list.forEach(function(room) {

        $('#select')
            .append(`<option value="${room}">${room}</option>`);

    });

});

$('#select')
    .on('change', function() {

        var room = $(this)
            .find(':selected')
            .val();
        $('#room')
            .val(room);
    });