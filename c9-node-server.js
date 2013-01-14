var http = require('http');
var fs = require('fs');
var path = require('path');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
 
http.createServer(function (request, response) {
 
    console.log('request starting...');
     
    var filePath = '.' + request.url;
    if (endsWith(filePath, '/'))
        filePath += 'index.html';
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }
    
    console.log(filePath);
     
    fs.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                    console.log(error);
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            console.log("file not found");
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.end("404 Not found");
        }
    });
     
}).listen(process.env.PORT);
 
console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT);