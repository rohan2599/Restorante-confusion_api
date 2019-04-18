var express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user.js');
var router = express.Router();
var passport = require('passport');
var authenticate =require('../authenticate');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signUp',(req,res,next)=>{

User.register(new User({username:req.body.username}), req.body.password ,(err,user)=>{
	if(err){
		res.statusCode=500;
		res.setHeader('Content-Type','application/json');
		res.json({err:err})

	}
	else{

		passport.authenticate('local')(req,res,()=>{

		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json({success:true, status:'Registered successfully'});	
	});
	}
});

});



router.post('/login', passport.authenticate('local',{failureFlash:'Invalid name or password'}), (req,res,next)=>{
		var token = authenticate.getToken({_id:req.user._id});
		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json({success:true, token:token, status:'successfully logged in'});

}) ;

router.get('/logout',(req , res , next)=>{
	if(req.session){
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');

	}
	else{
		var err = new Error('You are not logged in');
		err.status = 401;
		next(err);

	}
})



module.exports = router;
