var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
/*
 * GET permissionlist.
 */
router.get('/', function(req, res) {
  res.render('permission', { title: 'Manage Permissions' });
});
router.get('/permissionlist', function(req, res) {
    var db = req.db;
    db.collection('permissionlist').find().toArray(function (err, items) {
		console.log(items);
        res.json(items);
    });
});

/*
 * POST to savepermission.
 */
router.post('/savepermission', function(req, res) {
    var db = req.db;
	var dbParams = JSON.parse(JSON.stringify(req.body));
	//console.log(dbParams.firstname);
	if(dbParams._id==="" || dbParams._id==="undefined" || dbParams._id===undefined)
	{
		delete dbParams._id;
		db.collection('permissionlist').insert(dbParams, function(err, result){
			res.send(
				(err === null) ? { msg: '' } : { msg: err }
			);
		});
	}
	else
	{
		var recordId = new mongodb.ObjectID(dbParams._id);
		delete dbParams._id;
		console.log(dbParams);
		db.collection('permissionlist').update({_id: recordId}, dbParams,function(err, result){
			res.send(
				(err === null) ? { msg: '' } : { msg: err }
			);
		});
		
		/*db.collection('permissionlist').update({_id:recordId},{ $set: { "permissions": "Create, Read" } }, function(err, result){
			res.send(
				(err === null) ? { msg: '' } : { msg: err }
			);
		});*/
	}
});


/*
 * DELETE to deletepermission.
 */
router.delete('/deletepermission/:id', function(req, res) {
    var db = req.db;
    var permissionToDelete = req.params.id;
    db.collection('permissionlist').removeById(permissionToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;