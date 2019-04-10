const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const promotionSchema = new Schema ({

	name:{
		type:String,
		required:true,
		unique:true
	},
	image:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	}
	,
	featured:{
		type:Boolean,
		default:false
	},
	price:{
		min:0,
		type:Currency,
		required:true
	},
	label:{
		type:String,
		default:''
	}
},{
	timestamps:true
})




var Promotions  = mongoose.model('Promotion',promotionSchema);


module.exports = Promotions;