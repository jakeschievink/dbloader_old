var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});
