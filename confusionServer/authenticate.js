var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user.js');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./config');
var jwt = require('jsonwebtoken');



exports.local = passport.use(new LocalStrategy(User.authenticate()));



//methods for supporting sessions by the use of passport-local-mongoose plugin
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//method for generating the token when logging in
exports.getToken = function(user){
	return jwt.sign(user, config.secretKey ,{
		expiresIn:3600
	});
};


var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;


exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{

		console.log(jwt_payload);
		User.findOne({_id:jwt_payload._id},(err,user)=>{
			if(err){
				return done(err, false);
			}

			else if(user){
				return done(null ,user);
			}
			else{

				return done(null , false);
			}
		});
}));


exports.verifyUser = passport.authenticate('jwt',{session:false});


exports.verifyadmin = function(req,res,next){

	User.findOne({_id:req.user._id})
	.then((user)=>{
		if(user.admin){
			next();
		}

		else{
			var err = new Error('You are not authorised to perform this operation');
			err.status=403;
			return next(err);
		}
	},(err)=>next(err))
	.catch((err)=>{
		next(err);
	})
}