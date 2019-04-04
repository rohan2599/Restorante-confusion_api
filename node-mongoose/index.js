const mongoose = require('mongoose');


const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then((db)=>{
	console.log('connected to the server successfully');

	Dishes.create({
		name:'CustardE',
		description:'milk based desert'
	}).then((dish)=>{
		console.log(dish);
		return Dishes.findByIdAndUpdate(dish._id,{
			$set:{description:"updated dish"}
		},{
			new:true  
		}).exec();
	}).then((dish)=>{

		// console.log(dishes);
		dish.comments.push({
			rating:5,
			comment:"Delicious",
			author:"R.D"
		});




		return dish.save();

		 })
	.then((dish)=>{

		console.log(dish);
		return Dishes.remove({});
	}).then(()=>{
		return mongoose.connection.close();
	}).catch((err)=>{
		console.log(err);
	})
});
