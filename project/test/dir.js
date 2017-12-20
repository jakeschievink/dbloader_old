module.exports = {

	get_files: function () {
		var spawn = require('child_process').spawn
		var python = spawn('python', ['/home/pi/project_dbloader/project/py/test/dir.py'])

		python.stdout.on('data', function(data) { 
        		console.log(data.toString().split("\n"));
		});
	}
}
