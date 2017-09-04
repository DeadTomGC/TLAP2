/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var serverAddress = 'ws://127.0.0.1:8080';
var connection;

function connect() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    connection = new WebSocket(serverAddress);
    
    connection.onopen = function () {
        // connection is opened and ready to use
    };

    connection.onerror = function (error) {
        // an error occurred when sending/receiving data
    };

    connection.onmessage = function (message) {
        // try to decode json (I assume that each message
        // from server is json)
        try {
            var json = JSON.parse(message.data);
            processMessage(message.type,json);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ',
                    message.data);
            return;
        }
        // handle incoming message
    };
}

function processMessage(type,data){
    if(type==="games"){
        processGameList(data);
    }
}

function processGameList(data){
    return;
    
}

function getGames(){
    connection.send(JSON.stringify({action:"GETGAMES"}));
}