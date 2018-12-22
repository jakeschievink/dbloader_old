var utils = require(__dirname + '/js/utils.js');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');
var json = require('json-update');

var Dropbox = require('dropbox');

var secret = require(__dirname + '/doc/secret.json'); // where the appKey is ;)

var dir = require(__dirname + '/js/dir.js');
var dir_driver = require(__dirname + '/driver/dir_driver.js')

var im = require(__dirname + '/driver/imgmagick_driver.js');
var main_upload = require(__dirname + '/dbloader/main_upload.js');

app.get('/', function(req, res){ res.sendFile(__dirname + '/views/index.html'); });


var auth_procedure = 0;
var token;

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
	
	socket.on('parse_query', function(msg) {
		token = utils.parseQueryString(msg).access_token;
		console.log(token);
		json.update(__dirname + '/doc/secret.json', {token : token});
		auth_procedure = 0;
	});
	
	socket.on('check_token', function(msg) { if(token != "") { msg(1); } else { msg(0);} });
	
	socket.on('check_query', function(msg) { if(auth_procedure) { msg(1); } else { msg(0); } });
	
	
	
	socket.on('get_dropbox_auth', function(return_url) {
		var dbx = new Dropbox({ clientId: secret.appKey });
		var url = dbx.getAuthenticationUrl('http://localhost:80/dbloader_auth');
		console.log(url);
		auth_procedure = 1;
		return_url(url);
	});
	
	
	
	
	socket.on('upload', function(data) {
		//console.log(data.main_upload_files);
		main_upload.main_upload(data.main_upload_files);		
	});
	
	socket.on('status', function(data) {
		data({main_upload : main_upload_status});
	});
	

});

http.listen(80, function() {
  	console.log('listening on *:80');

	// add function to create the process_folder if its not avaible
	

	
	// after finishing certain file delete from process folder
/*  	im.resize("/mnt/usb_mount/Kidolgozni/DSCN4280.JPG", [500,500], function(reply) {
  		console.log("Code: " + reply);
  	})
*/
});

var main_upload_status;

function checkups() {
	
	main_upload.main_upload_status( function(status) {
		if(main_upload_status != status) {
			main_upload_status = status;
			console.log(main_upload_status);
		}
	});

}

setInterval(checkups, 100);

