var http = require('http');
var fs = require('fs');

var test_dir = require(__dirname + '/test/dir.js');

http.createServer(function(request, response) {  

   fs.readFile(__dirname + '/views/index.html', function (err, html) {
     if (err) {
        throw err; 
     }

    response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(html);  
    response.end();  

    test_dir.get_files();

   });       

}).listen(8000);
