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
		});
	});       

}).listen(8000);		// on port 8000
