var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
	db.collection('permissionlist').find().toArray(function (err, items) {
		var domPermissions = items;
		//console.log(JSON.stringify(domPermissions));
		res.render('index', { 'title': 'Home','domPermissions':domPermissions });
	});
});

module.exports = router;
