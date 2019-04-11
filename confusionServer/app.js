var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');


const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

const Dishes = require('./models/dishes.js');


connect.then((db)=>{
	console.log('connected successfully')
},(err)=>{
	console.log(err);
});




var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function auth(req,res,next){

	console.log(req.headers);
	var authHeader = req.headers.authorization;

	if(authHeader == null){

		var err = new Error('You are not authenticated');
		res.setHeader('WWW-Authenticate','Basic');
		err.status=401;
		return  next(err);
	}

	var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

	var username = auth[0];
	var password = auth[1];

	if(username=='admin' && password=='password'){
		next();
	}
	else{
		var err = new Error('You are not authenticated');
		res.setHeader('WWW-Authenticate','Basic');
		err.status= 401;
		return next(err);
	}

}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);



app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
