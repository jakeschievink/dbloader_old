/*
 *	dir.js is used for accessing the filesystem
 */

var spawn = require('child_process').spawn

var main_path = "/home/pi/project_dbloader/project/py/test/"

module.exports = {

	get_files: function (path) {

		var get_files_execute_path = main_path + "get_files.py"
		var get_files = spawn('python', [get_files_execute_path, path])

		get_files.stdout.on('data', function(data) { 
        		console.log(data.toString().split("\n"));
		});
	},
	get_usb: function() {
		var get_usb_execute_path = main_path + "get_usb.py"
		var get_usb = spawn('python', [get_usb_execute_path])

		get_usb.stdout.on('data', function(data) {
			console.log(data.toString());
		});
	}

}
