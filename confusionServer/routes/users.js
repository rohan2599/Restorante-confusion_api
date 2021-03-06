var express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user.js');
var router = express.Router();
var passport = require('passport');
var authenticate =require('../authenticate');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/',authenticate.verifyUser, authenticate.verifyadmin, function(req, res, next) {
 		
 		User.find({})
 		.then((user)=>{

 			res.statusCode=200;
 			res.setHeader('Content-Type','application/json');
 			res.json(user);

 		},(err)=> next(err))
 		.catch((err)=>{
 			next(err);
 		})

 		
});



router.post('/signUp',(req,res,next)=>{

User.register(new User({username:req.body.username}), req.body.password ,(err,user)=>{
	if(err){
		res.statusCode=500;
		res.setHeader('Content-Type','application/json');
		res.json({err:err})

	}
	else{

		if(req.body.firstName)
			user.firstName=req.body.firstName
		if(req.body.lastName)
			user.lastName=req.body.lastName

		user.save((err,user)=>{

		if(err){
		res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
		}
		passport.authenticate('local')(req,res,()=>{
		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json({success:true, status:'Registered successfully'});	
	});
		})
	
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
