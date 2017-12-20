var http = require('http');
var fs = require('fs');

var test_dir = require(__dirname + '/test/dir.js');

http.createServer(function(request, response) {  

	fs.readFile(__dirname + '/views/index.html', function (err, html) {
     		if (err) {
        		throw err; 
     		}

     		var path = "/home/pi/project_dbloader/project/"; 

    		response.writeHeader(200, {"Content-Type": "text/html"});  
    		response.write(html);  
    		response.end();  

    		test_dir.get_files(path);

	});       

}).listen(8000);
