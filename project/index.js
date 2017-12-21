var http = require('http');								// importing http
var fs = require('fs');									// importing file system

var test_dir = require(__dirname + '/test/dir.js');					// the dir scripts TODO: create a relative path

// create the server
http.createServer(function(request, response) {  
	
	// if we are opening index.html
	fs.readFile(__dirname + '/views/index.html', function (err, html) {
     		if (err) {
        		throw err; 
     		}

		// our testr path
     		var path = "/home/pi/project_dbloader/project/"; 

		// give out the whole html
    		response.writeHeader(200, {"Content-Type": "text/html"});  
    		response.write(html);  
    		response.end();  

		
		test_dir.get_usb( function(data)  {
			console.log(data);
			
			test_dir.create_mount_folder(function(success) {

				switch(success.toString()) {
					case "e":
						console.log("Some kind of error in get_usb()");
						// handle
						break;
					case "1":
						console.log("Already excisting mount");
						break;
					case "y":
						console.log("Created the mount");
						break;
					default:
						console.log(success.toString());
				}

				test_dir.mount_usb(data.toString(), function(return_data){
					switch(return_data.toString()) {
						case "e":
							console.log("Some kind of error in mount_usb()");
							break;
						case "32":
							console.log("Mounted!");
							break;
					}
				});
			});

			test_dir.check_mount("/mnt/usb_mount", function(data){
				if(data) {
					console.log("It is mounted");
				} else {
					console.log("Not mounted");
				}
			});
		}); 
	});

}).listen(8000);		// on port 8000
