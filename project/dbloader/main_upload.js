var Dropbox = require('dropbox');

var index = require('../index.js');
var path = require('path');
var secret = require('../doc/secret.json');
var fs = require('fs');

var current_status;


module.exports = {
	main_upload: function(data) {
				
		var dbx = new Dropbox({ accessToken: secret.token });
		
		var release = false;
		var counter = 0;
		
		current_status = "s";
		
		for(i = 0; i < data.length; i++ ) {
		
			console.log("processin: " + i);
		
			file_name = path.basename(data[i]).toString();
			current_file = fs.readFileSync(data[i]);

			
			
					dbx.filesUpload({path: '/dbloader/Original/' + file_name, contents : current_file})
					.then(function(response) {
						//console.log(response);
						console.log("Uploaded: " + response.path_display);
						current_status = response.path_display + " ✔🆗";
						counter = counter + 1;
						console.log(data.length);
						console.log(counter);
						if(data.length == counter) {
							current_status = "Finished";
						}
					})
					.catch(function(error) {
						console.error(error);
						current_status = "Error! Reload page, and authenticate with dropbox (Click on: Setup dropbox) and reboot your dbloader unit.";
					});
					
					
				
			
		}		
		current_status = "All executed";
		console.log("All executed");
	},
	main_upload_status: function(status) {
		status(current_status);
	}
	
}
