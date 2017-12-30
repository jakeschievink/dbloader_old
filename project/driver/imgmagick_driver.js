var spawn = require('child_process').spawn
var exec = require('child_process').exec

var ext = require(__dirname + '/extensions.js')

module.exports = {
	resize: function(input_file, new_size, output_file) {
		
		var renamed_output_file
		
		ext.rename(input_file, (new_size[0] + "x" + new_size[1]), function(reply){
			renamed_output_file = reply
		});
		
		console.log("Resizing file " + input_file);
		console.log("Input file: " + input_file);
		console.log("Parameters: " + new_size[0] + "x" + new_size[1]);
		console.log("Output file: " + renamed_output_file);
		
		// do the things
		
		output_file(renamed_output_file);
		
		console.log("------------------------------------------------------");
	}
}
