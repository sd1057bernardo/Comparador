console.clear();
console.log("Script Iniciado!")
const express = require('express'); //
const app = express();

//VIEWS FILES AND ROUTERS
app.get('/',(req, res)=>{
	res.sendFile(`${__dirname}/views/index.html`)
});
app.get('/index',(req, res)=>{
	res.sendFile(`${__dirname}/views/index.html`)
});
app.get('/modifier',(req, res)=>{
	res.sendFile(`${__dirname}/views/modifier.html`)
});
app.get('/simulation',(req, res)=>{
	res.sendFile(`${__dirname}/views/simulation.html`)
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
app.use(express.urlencoded({
    extended : false
}));
require('./controllers/jsonControl.js')(app);

app.listen(80, (err)=>{
	console.log("Servidor Iniciado na porta: 80 ;")
})