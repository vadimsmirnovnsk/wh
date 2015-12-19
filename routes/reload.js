var express = require('express');
var router = express.Router();

/* GET reload page. */
router.get('/', function(req, res, next) {
	reload();
 	res.render('reload', { title: 'Warning Heroes: v4iOS', message: 'File has been reloaded!' });
});

router.file(function() {
	return fileData;
});

module.exports = router;

var fs = require('fs');

var fileName = "output.txt";

var fileData = "Please upload the warning file to server v4ios@ratm.2gis.local/wh/output.txt";
var fileStat = "File doesn't have been loaded.";

// TODO: Move loading data to separated common module that loads with server start sync, 
// and then async

function reload() {
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
}