var spawn = require('child_process').spawn
var exec = require('child_process').exec

var ext = require(__dirname + '/extensions.js')

module.exports = {
	resize: function(input_file, new_size, output_file) {
		
		var renamed_output_file
		var new_size_string = new_size[0] + "x" + new_size[1]
		
		
		ext.rename(input_file, (new_size_string), function(reply){
			renamed_output_file = reply
		});
		
		console.log("Resizing file " + input_file);
		console.log("Input file: " + input_file);
		console.log("Parameters: " + new_size_string);
		console.log("Output file: " + renamed_output_file);
		
		// the command
		var resize_command = spawn('convert', [input_file, "-resize", new_size_string, renamed_output_file])

		// execute it and watchig the exit code
		resize_command.on('exit', function (code) {
			output_file(code)
		});
		      				
		console.log("------------------------------------------------------");
	}
}
