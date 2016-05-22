var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');

/* Create a mysql connection  */
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'LEGOAPP',
  password : 'LEGOAPP',
  database : 'LEGOAPP'
});

connection.connect();

/* GET home page. */
router.get('/test', function(req,res,next) {
	res.render('homepage');
});

router.get('/', function(req, res, next) {  	
  res.render('index', { title: 'Lego Stopby' });
});

router.get('/Crawler-Grabber',function(req,res,next) {
	var dir = '/Users/cailin/Library/Mobile Documents/com~apple~CloudDocs/Crawler-Grabber_photo'
	

	var picList = fs.readdirSync(dir);
	var picListObject = {};
	picList.forEach(function(file,index) {
		var pindex = 'p'+index;
		picListObject[pindex] = file;
	});

	//console.log(picListObject);

	res.render('picList',picListObject)
});

router.post('/',function(req, res, next) {
	var account = req.body.account;
	var password = req.body.password;
	var _sqlValidateUser = 'select USER_ID from APP_USERS where EMAIL = ? and PASSWORD_HASH = ?';
	var binds = [account,password];
	connection.query(_sqlValidateUser,binds,function(err,result) {
		if (err) throw err;
		//console.log(result);
		if (result[0] === undefined ) {
			console.log(result);
			res.render('error');
		} else {
			//User pass
			res.render('homepage');
		}
	});
});

router.post('/register/email', function(req, res, next) {
	
	var fullname 	= req.body.fullname;
	var account 	= req.body.account;
	var password 	= req.body.password;
	var userid;

	var email = account;
	
	var getUserid = "select _nextval('userid') as userid";
	connection.query(getUserid,function (err,result) {
		if (err) throw err;
		
		userid  = result[0].userid;
		
	});

	var insertUser = "insert APP_USERS values (?,?,?,?,?);";
	var values =[userid,fullname,email,null,password];

	var _sql = mysql.format(insertUser,values); //Create SQL statement to insert the user
	//console.log(_sql);

	connection.query(_sql,function(err,results) {
		if (err) throw err;
	
	});
	alert('Register Sucessfully');
	res.redirect('/');

});

module.exports = router;
