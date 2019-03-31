

var rect =require('./rectangle.js');
function solverect (a,b){
	
	rect(a,b , (err , rectangle)=>{
		if(err){
			console.log(err.message);
		}
		else{
			console.log("Perimeter"+ rectangle.perimeter());
			console.log("Area" + rectangle.area());
		}
	});
	console.log("This is after function call");
}

solverect(5,3);