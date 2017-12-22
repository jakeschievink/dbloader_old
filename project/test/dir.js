/*
 *	dir.js is used for accessing the filesystem
 */

// spawn - we execute python scripts with this
var spawn = require('child_process').spawn
var exec  = require('child_process').exec;

// the main path where these scripts are 
// TODO move to a global database or something
var main_path = "/home/pi/project_dbloader/project/py/"
var mount_path = "/mnt/usb_mount"

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
	// returns -> 0 - nothing found
	// 	   -> the path if found
	get_usb: function(status) {

		var get_usb_execute_path = main_path + "get_usb.py"					// set the file we want to execute
		var get_usb = spawn('python', [get_usb_execute_path])					// execut the file

		console.log("Getting usb");

		// on stdout we read the data
		get_usb.stdout.on('data', function(data) {
			if(data.toString() == "0") {
				console.log("Nothing");
				status("0");
			} else {
				status(data.toString())							// as a callback we return the value
			}
		});
	},

	// create_mount_folder -> creates the mounting directory
	// returns -> 2 - already excisting 
	//	      0 - some kind of error
	// 	      1 - created the mount
	create_mount_folder: function(status) {
		exec('mkdir ' + mount_path, function(error, stdout, stderr) {
  			if (error) {
		  		if(error.code == 1) {
					console.log("Already excisting mount");
					status("2");
				} else {
					console.log("Some kind of error");
					status("0");
				}
			} else {
				console.log("Created the mount");
				status("1");
			}
		});
	},

	// mount_usb -> moun the usb_path
	// return -> 1 - mounted
	//        -> 0 - error
	mount_usb: function(usb_path, status) {
		exec('mount ' + usb_path + ' ' + mount_path, function(error, stdout, stderr) {
			if(stdout.toString == "32") {
				console.log("Mounted");
				status("1");
			} else {
				console.log("Error");
				status("0");
			}
		});
	},

	// check_mount -> checks if the folder is mounted
	// return -> 0 - error
	//           data - mounted
	check_mount: function(usb_path, return_data) {
		var command = "if mountpoint -q " + usb_path + "; then echo '1'; else echo '0'; fi;";
		exec(command, function(error, stdout, stderr) {
			if(error) {
				console.log("Error in mounting");
				status("0");
			} else {
				console.log("Mounted");
				status(stdout.toString());
			}
		});
	}

}
