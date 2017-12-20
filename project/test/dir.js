/*
 *	dir.js is used for accessing the filesystem
 */

// spawn - we execute python scripts with this
var spawn = require('child_process').spawn

// the main path where these scripts are 
// TODO move to a global database or something
var main_path = "/home/pi/project_dbloader/project/py/test/"

// all the functions that can be accessed via nodejs 
module.exports = {

	// get_files -> gets all the files in a 'path' 
	// it prints out the paths into a list
	get_files: function (path) {

		var get_files_execute_path = main_path + "get_files.py"					// set the file we want to execute
		var get_files = spawn('python', [get_files_execute_path, path])				// execute it with 'path' as the argument

		// on stdout we read the data
		get_files.stdout.on('data', function(data) { 
        		console.log(data.toString().split("\n"))					// print out the data
		});
	},

	// get_usb -> gets where the usb is
	// it prints out the /dev/sdX
	get_usb: function(return_data) {

		var get_usb_execute_path = main_path + "get_usb.py"					// set the file we want to execute
		var get_usb = spawn('python', [get_usb_execute_path])					// execut the file

		// on stdout we read the data
		get_usb.stdout.on('data', function(data) {
			return_data(data.toString())							// as a callback we return the value
		});
	}

}
