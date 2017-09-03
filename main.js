"use strict";


var WebSocketServer = require('websocket').server;
var http = require('http');
var games = ["No Games"];
var clients = [];
var userID = 2;

var portNumber = 8080;

var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});

server.listen(portNumber, function () { });

// create the server
var wsServer = new WebSocketServer({
    httpServer: server
});

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

// WebSocket server
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    userID = userID + 1;
    clients.push({conn: connection, id: userID});
    var id = userID;
    console.log("client count: " + clients.length + '\n');
    var userName = false;
    var userColor = false;
    var gameId = "";
    var role = "";
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            var messageText = htmlEntities(message.utf8Data);
            console.log("received text: " + messageText + '\n');
            try {
                var fields = JSON.parse(messageText);
                var action = fields.action;
                if (action === "GETGAMES") {
                    var response = JSON.stringify({type: 'games', data: games});
                    connection.sendUTF(response);
                }
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ',
                        messageText);
                return;
            }
        }
    });

    connection.on('close', function (connection) {
        for (var i = 0; i < clients.length; i = i + 1) {
            console.log("looping");
            if (clients[i].id === id) {
                console.log("deleting");
                clients.splice(i, 1);
                break;
            }
        }
        console.log("client count: " + clients.length + ' deleted: ' + id + '\n');
    });
});