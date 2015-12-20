var express = require('express');
var warnings = require('../warnings');
var router = express.Router();

/* GET reload page. */
router.get('/', function(req, res, next) {
	warnings.reloadAsync();
 	res.render('reload', { title: 'Warning Heroes: v4iOS', message: 'File has been reloaded!' });
});

module.exports = router;
