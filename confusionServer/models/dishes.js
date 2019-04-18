const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
		rating:{
			type:Number,
			min:1,
			max:5,
			required:true
		},
		comment:{
			type:String,
			required:true
		},
		author:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User',
			required:true
		}

},{
	timestamps:true
})




const dishSchema = new Schema({

	name:{
		type:String,
		required:true,
		unique:true
	},
	description:{
		required:true,
		type:String
	},
	image:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	label:{
		type:String,
		default:''
	},
	price:{
		type:Currency,
		min:0,
		required:true
	},
	featured:{
		type:Boolean,
		default:false
	},
	comments:[commentSchema]
},{
	timestamps:true
})


var Dishes = mongoose.model('dish',dishSchema);


module.exports = Dishes;
