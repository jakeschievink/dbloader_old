var Dropbox = require('dropbox');

var path = require('path');
var secret = require('../doc/secret.json');
var fs = require('fs');


module.exports = {
	main_upload: function(data) {
				
		var dbx = new Dropbox({ accessToken: secret.token });
		
		var release = false;
		var counter = 0;
		
		for(i = 0; i < data.length; i++ ) {
		
			console.log("processin: " + i);
		
			file_name = path.basename(data[i]).toString();
			current_file = fs.readFileSync(data[i]);

			
			
					dbx.filesUpload({path: '/dbloader/Original/' + file_name, contents : current_file})
					.then(function(response) {
						//console.log(response);
						console.log("Uploaded: " + response.path_display);
						counter = counter + 1;
						console.log(data.length);
						console.log(counter);
						if(data.length == counter) {
							console.log("Finished");
						}
					})
					.catch(function(error) {
						console.error(error);
					});
					
					
				
			
		}		
		console.log("All executed");
	}
}
