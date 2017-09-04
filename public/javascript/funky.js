/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var connection;

window.onload = init;

var game_list;

function init(){
    game_list=document.getElementById("game_list");
    connect();
    getGames();
}


function connect() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    connection = new WebSocket('ws://127.0.0.1:8080');
    
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
            game_list.innerHTML = json.data[0];
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ',
                    message.data);
            return;
        }
        // handle incoming message
    };
}

function getGames(){
    connection.send(JSON.stringify({action:"GETGAMES"}));
}
    