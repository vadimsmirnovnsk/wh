var express = require('express');
var warnings = require('../warnings');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var allWarnings = new warnings.Create();
	var sortedWarnings = allWarnings.warnings;
	sortedWarnings.sort(dynamicSort('email'));
	res.render('index', { title: 'Warning Heroes: v4iOS', warnings: sortedWarnings });
});

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

module.exports = router;
