var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var dir = require(__dirname + '/js/dir.js');
	var dir_driver = require(__dirname + '/driver/dir_driver.js')

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('test', function(msg){
    console.log('message: ' + msg);
  });  
});

http.listen(8000, function(){
  	console.log('listening on *:8000');
	
 	dir.setup_usb(function(status, access_path) {
		console.log("Status: " + status);
		console.log("Mount: " + dir_driver.mount_path)
		dir_driver.get_files((dir_driver.mount_path).toString());
	});

});
