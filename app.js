console.clear();
console.log("Script Iniciado!")
const express = require('express');
const app = express();

jsonFile = require("./db.json"); // DATABASE THIS PROJECT*

//VIEWS FILES AND ROUTERS
app.get('/',(req, res)=>{
	res.sendFile(`${__dirname}/view/index.html`)
});
app.get('/additem',(req, res)=>{
	res.sendFile(`${__dirname}/view/additem.html`)
});
app.get('/simulation',(req, res)=>{
	res.sendFile(`${__dirname}/view/simulation.html`)
});

//FILES PUBLIC
app.use('/public', express.static('public'));

/*
This session will be responsible for receiving the requests
to be executed in the database(db.json) * Upon receiving
the request(POST, PUT, DELL, GET) find the specific function
and deliver it to the client.
*/
app.use(express.json());
app.get('/json',(req,res)=>{
	res.json(jsonFile);
})
app.post('/json', (req,res)=>{
	console.log(`${req.body}`);
	res.json(jsonFile);
});

//start service
app.listen(80, (err)=>{
	console.log("Servidor Iniciado na porta: 80 ;")
})