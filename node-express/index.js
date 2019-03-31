const express = require('express');
const http = require('http');
const hostname = 'localhost';
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./router/dishRouter.js');
const promoRouter = require('./router/promoRouter.js');
const leaderRouter = require('./router/leaderRouter.js');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
app.use(express.static( __dirname + '/public'));

app.use((req,res,next)=>{

	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');
	res.end('<html><body><h1>This is an express server !</h1></body></html>');
})



const server = http.createServer(app);

server.listen(port, hostname, ()=>{
	console.log(`server started on port ${port}`);
})


