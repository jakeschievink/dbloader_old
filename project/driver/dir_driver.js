/*
 *	dir_driver.js is used for accessing the filesystem
 */

// spawn - we execute python scripts with this
var spawn = require('child_process').spawn
var exec  = require('child_process').exec

// the main path where these scripts are 
// TODO move to a global database or something
var main_path = "/home/pi/project_db/project/py/"
var mount_path = "/mnt/usb_mount"



// all the functions that can be accessed via nodejs 
module.exports = {
	main_path,mount_path,

	// get_files -> gets all the files in a 'path' 
	// it prints out the paths into a list
	get_files: function (path, return_data) {

		var get_files_execute_path = main_path + "get_files.py"					// set the file we want to execute
		var get_files = spawn('python', [get_files_execute_path, path])				// execute it with 'path' as the argument

		// on stdout we read the data
		get_files.stdout.on('data', function(data) { 
        		return_data(data.toString().split("\n"))					// print out the data
		});
	},

	// get_usb -> gets where the usb is
	// it prints out the /dev/sdX
	get_usb: function(return_data) {

		var get_usb_execute_path = main_path + "get_usb.py"					// set the file we want to execute
		var get_usb_spawn = spawn('python', [get_usb_execute_path])					// execut the file

		console.log("Getting usb...");

		// on stdout we read the data
		get_usb_spawn.stdout.on('data', function(data) {
			
			if(data.toString() == "0") {
				console.log("Nothing");
			}

			return_data((data.toString()).replace(/(\r\n|\n|\r)/gm,""))							// as a callback we return the value
		});
	},

	// create_mount_folder -> creates the mounting directory
	create_mount_folder: function(return_data) {
		exec('mkdir ' + mount_path, function(error, stdout, stderr) {
  			if (error) {
		  		if(error.code == 1) {
					return_data("1");			// already excisting
				} else {
					return_data("e");			// other errors
				}
			} else {
				return_data("y")
			}
		});
	},

	// mount_usb -> moun the usb_path
	mount_usb: function(usb_path, return_data) {

//		console.log(usb_path);
//		console.log(mount_path);

		exec('mount ' + usb_path + ' ' + mount_path, function(error, stdout, stderr) {
			return_data(stdout.toString());				// just return it
// 			console.log(stderr);
		});
	},

	// check_mount -> checks if the folder is mounted
	check_mount: function(return_data) {
		var command = "if mountpoint -q " + mount_path + "; then echo '1'; else echo '0'; fi;";
		exec(command, function(error, stdout, stderr) {
			if(error) {
				return_data("e");
			} else {
				return_data(stdout.toString());
			}
		});
	}

}
