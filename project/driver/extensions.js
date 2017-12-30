var path = require('path')

module.exports = {
	rename: function(input_name, function_name, output_name) {
		var name = path.parse(input_name).name
		var dir  = "/home/pi/project_db/process_folder/"
		var ext = path.parse(input_name).ext
		
		output_name(dir + name + "_" + function_name + ext) 
	}
}
