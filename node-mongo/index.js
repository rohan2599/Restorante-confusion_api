const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations.js');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url,(err,client)=>{

	assert.equal(err,null);
	console.log("Connnected to server");

	const db = client.db(dbname);


	dboper.insertDocument(db, {name:"Brownie", description:"Dark chocolate"}, dishes , (result)=>{
		console.log("Insert Document", result.ops);

		dboper.findDocument(db,'dishes',(docs)=>{
			console.log("Finding Document",docs);

			dboper.updateDocument(db,{name:"Brownie"}, {description:"Sizzling chocolate"},'dishes', (result)=>{
				console.log("Updated the document", result.result);

					db.findDocument(db, 'dishes', (docs)=>{

						console.log("Founded the document",docs);

						db.dropCollection('dishes',(result)=>{
							console.log("Dropping the collection");
							client.close();

						})

					})
			})
		})
	});

	// const collection = db.collection('dishes');

	// collection.insertOne({"name":"Uthapizza",description:"test"},(err,result)=>{

	// 	assert.equal(err,null);
	// 	console.log('After Insertion:\n');
	// 	console.log(result.ops);

	// 	collection.find({}).toArray((err,docs)=>{
	// 		assert.equal(err,null);
	// 		console.log('After Finding:\n');
	// 		console.log(docs);

	// 			db.dropCollection((err,result)=>{
	// 				assert.equal(err,null);

	// 				client.close();
	// 			})
	// 	})
	// });
})
