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

	
	/*
	 *  Communicating with index.html about the usb 
	 */
	socket.on('usb', function(msg) {
		if(msg == "mount") { // if we are talking about mounting
			dir.get_usb_dev_path(function(usb_dev_path){
				console.log(usb_dev_path.toString());
				dir.setup_usb(function(status) {
					// returning data about the status and the dev path of the usb
					socket.emit('usb_mount', {stat : status, path : usb_dev_path });
				});
			});
		}
	});
 
});

http.listen(8000, function(){
  	console.log('listening on *:8000');
});
