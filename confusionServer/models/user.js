const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	firstName:{
		type:String,
		default:''
	},
	lastName:{
		type:String,
		default:''
	}
	,
	admin:{
		type:Boolean,
		default:false
	}
})

User.plugin(passportLocalMongoose);



module.exports= mongoose.model('User',User);
