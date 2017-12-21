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

		// execute some test
		test_dir.get_usb( function(data)  {
			console.log(data);

			test_dir.create_mount_folder(function(success) {
				if(success.toString() == "e") {
					console.log("Some kind of error in get_usb()");
					// handle error
				} else if(success.toString() == "1") {
					console.log("Already excisting mount");
				}

				
			});
		});
	});

}).listen(8000);		// on port 8000
