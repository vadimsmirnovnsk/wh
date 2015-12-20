var fs = require('fs');

var fileName = "output.txt";
var fileHasBeenLoaded = false;
var fileData = "Please upload the warning file to server v4ios@ratm.2gis.local/wh/output.txt";
var fileStat = "File doesn't have been loaded.";
var cachedWarnings = [];

function Warning (description, place, author, email) {
	this.description = description;
	this.place = place;
	this.author = author;
	this.email = email;
}

function Create() {
	if (!fileHasBeenLoaded) {
		reloadSync();
	};

	this.fileStat = fileStat;
	cachedWarnings = parse(fileData);
	this.warnings = cachedWarnings;

}

function parse(data) {
	var warnings = [];
	var strings = arrayOfStrings(data);

	for (var i = 0; i < strings.length; i++) {
		string = strings[i];

		if(findWarning(string)) {
			var description = string;
			description = removeTab(description);
			i++;
			var place = strings[i];
			place = removeTab(place);
			i++;
			var author = strings[i];
			author = removeTab(author);
			i++;
			var email = strings[i];
			email = removeTab(email);

			warnings.push(new Warning(description, place, author, email));	
		}
	};

	return warnings;
}

function removeTab(data) {
	return data.toString().replace('\t', '').split('\r\n');
}

function arrayOfStrings(data) {
	var stringsArray = [];
	var remaining = '';
	remaining += data;
    var index = remaining.indexOf('\n');
    // console.log('Indexes: ' + index);
    var last  = 0;

    while (index > -1) {
		var line = remaining.substring(last, index);
		last = index + 1;
		stringsArray.push(line);
		index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);

    return stringsArray;
}

function findWarning(string) {
	var regex = /^([0-9\.])*.\t/
	var result = string.match(regex);

	return result;
}

function reloadSync() {
	try {
		var stats = fs.statSync(fileName);
	} catch(err) {
		if (err) {
			console.log('Error reading file: ' + fileName + '\nError: ' + err);
			return;
		};
	}

	if (stats.isFile() == true) {
		fileHasBeenLoaded = true;
		fileStat = "File loaded sync";
		try {
			fileData = fs.readFileSync(fileName, {encoding : 'utf-8'});
		} catch (err) {
			console.log('Error reading file: ' + fileName + '\nError: ' + err);
			return;
		}
	};
}

function reloadAsync() {
	fs.stat(fileName, function(err, stats) {
		if (err) {
			console.log(err);
		};

		if (stats.isFile() == true) 
		{
			fileHasBeenLoaded = true;
			fileStat = "File loaded async";
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

exports.Create = Create;
exports.reloadAsync = reloadAsync;
exports.cachedWarnings = cachedWarnings;

console.log('Warnings module is required.');