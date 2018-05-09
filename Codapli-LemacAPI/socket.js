var io = require('socket.io');
var socket;

module.exports = {
    start: function (server) {
        socket = io(server);
    },
    io: function () {
        return socket;
    }
}

