module.exports = {

	get_files: function (path) {
		//var path = "/home/pi/project_dbloader/project/";

		var spawn = require('child_process').spawn
		var python = spawn('python', ['/home/pi/project_dbloader/project/py/test/dir.py', path])

		python.stdout.on('data', function(data) { 
        		console.log(data.toString().split("\n"));
		});
	}
}
