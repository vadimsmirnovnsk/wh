var http = require('http');
var fs = require('fs');

var fileName = "output.txt";

var server = new http.Server();
var fileData = "Please upload the warning file to server v4ios@ratm.2gis.local/wh/output.txt";
var fileStat = "File doesn't have been loaded.";

server.listen(1337, '127.0.0.1');
console.log("Server did start on port: 1337");

server.on('request', function(req, res) {
	res.end(fileData);
});

fs.stat(fileName, function(err, stats) {
	if (err) {
		console.log(err);
	};

	if (stats.isFile() == true) 
	{
		fileStat = "File loaded";
		fs.readFile(fileName, {encoding : 'utf-8'}, function(err, data) {
			if(err) {
				console.log(err);
			} else {
				fileData = data;
			}
		});
	}

	console.log(fileStat);
});

