var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
/*
 * GET userlist.
 */
router.get('/userlist/:firstname?/:lastname?', function(req, res) {
	//objParams = {};
	fname = "";
	lname="";
	if(req.params.firstname)
	{
		fname=req.params.firstname;
		//objParams.firstname=fname;
	}
	if(req.params.lastname)
	{
		lname = req.params.lastname
		//objParams.lastname=req.params.lastname;
	}
	//console.log(fname);
	//console.log(objParams);
    var db = req.db;
    db.collection('userlist').find({ firstname: { $regex: fname+'.*', $options: 'i' }, lastname: { $regex: lname+'.*', $options: 'i' } }).toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to saveuser.
 */
router.post('/saveuser', function(req, res) {
    var db = req.db;
	var dbParams = JSON.parse(JSON.stringify(req.body));
	//console.log(dbParams.firstname);
	if(dbParams._id==="" || dbParams._id==="undefined" || dbParams._id===undefined)
	{
		delete dbParams._id;
		db.collection('userlist').insert(dbParams, function(err, result){
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
		db.collection('userlist').update({_id: recordId}, dbParams,function(err, result){
			res.send(
				(err === null) ? { msg: '' } : { msg: err }
			);
		});
		
		/*db.collection('userlist').update({_id:recordId},{ $set: { "permissions": "Create, Read" } }, function(err, result){
			res.send(
				(err === null) ? { msg: '' } : { msg: err }
			);
		});*/
	}
});


/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;