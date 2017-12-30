var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var secret = require(__dirname + '/doc/secret.json'); // where the appKey is ;)

var dir = require(__dirname + '/js/dir.js');
var dir_driver = require(__dirname + '/driver/dir_driver.js')

var im = require(__dirname + '/driver/imgmagick_driver.js');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){

	/*
	 *  Communicating with index.html about the usb 
	 */
	socket.on('usb', function(msg) {
		if(msg == "mount") { // if we are talking about mounting
			dir.get_usb_dev_path(function(usb_dev_path){
				dir.setup_usb(function(status) {
					// returning data about the status and the dev path of the usb
					socket.emit('usb_mount', {stat : status, path : usb_dev_path });
				});
			});
		}
	});

	/*
         *  Communicating with index.html about the files
         */ 
	socket.on('files', function(type) {
		if(type == "get_files") {
			dir_driver.get_files(dir_driver.mount_path, function(data) {
				socket.emit('files', { array_data : data });
			});
		} else if(type == "mount_folder") {
			socket.emit('files', { mount_folder : dir_driver.mount_path});
		}
	});

});

http.listen(8000, function() {
  	console.log('listening on *:8000');

	// add function to create the process_folder if its not avaible

	// after finishing certain file delete from process folder
/*  	im.resize("/mnt/usb_mount/Kidolgozni/DSCN4280.JPG", [500,500], function(reply) {
  		console.log("Code: " + reply);
  	})
*/
});
