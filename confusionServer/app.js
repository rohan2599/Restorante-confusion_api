var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate.js');
var config = require('./config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');


const mongoose = require('mongoose');
const url = config.mongoUrl;
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
//app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
	name:'session-id',
	secret:'12345-67890-09876-54321',
	resave: false,
	saveUninitialized:false,
	store: new FileStore()
}));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

//if  user is present , then move to the next request

function auth(req,res,next){

	console.log(req.session);

	if(!req.user){
	
		var err = new Error('You are not authenticated');
		err.status= 401;
		return next(err);
	

}

else{
	next();
	
}

}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


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
