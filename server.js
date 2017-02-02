/**
* @descripción Módulos, archivos y servicios REST usados por el servidor
* @autor Adrián Sánchez <contact@imaginexyz.com>
*/


//Módulos Necesitados
var express = require('express'), //Biblioteca para permitir servicios REST
    cookieParser = require('cookie-parser'), 
    bodyParser = require('body-parser'), //Biblioteca para manejar los datos de las solicitudes
    cors = require('cors'); //Biblioteca para permitir las llamadas CORS

//REST APIS
var  database = require('./services/database'),  //Archivo donde vamos a comunicarnos con la base de datos
	tempServices = require('./services/temperature'),
	pressServices = require('./services/pressure'),
  ultraServices = require('./services/ultrasonic'),
  basicServices = require('./services/basic');

var app = express();
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*app.use('/temperature', express.static(__dirname + '/temp'));
app.use('/pressure', express.static(__dirname + '/press'));
app.use('/ultrasonic', express.static(__dirname + '/ultra'));*/
app.use(express.static(__dirname + '/examples'));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin');
  next();
});

//Servicios REST permitidos
/*app.get('/all', database.getData);  //GET
app.get('/mobile', database.getMobile);  //GET
app.get('/last', database.getLast);  //GET
app.post('/sensor', database.addIoT); //POST 
app.post('/mobile', database.addMobile); //POST*/

//Innovare 
/*
app.get('/temperature/temp', tempServices.getBasic);  //GET
app.get('/temperature/temps', tempServices.getTemp);  //GET
app.get('/temp', tempServices.getBasic);  //GET
app.post('/temp', tempServices.postTemp); //POST 

app.get('/pressure/pres', pressServices.getBasic);  //GET
app.get('/pressure/press', pressServices.getPress);  //GET
app.get('/press', pressServices.getBasic);  //GET
app.post('/press', pressServices.postPress); //POST 

app.get('/ultrasonic/ultra', ultraServices.getBasic);  //GET
app.get('/ultrasonic/ultras', ultraServices.getUltra);  //GET
app.get('/ultra', ultraServices.getRange);  //GET
app.post('/ultra', ultraServices.postUltra); //POST 
*/

//Innovación 360
app.get('/temp', basicServices.getTemp);  //GET
app.post('/temp', basicServices.postTemp); //POST 
app.get('/press', basicServices.getPress);  //GET
app.post('/press', basicServices.postPress); //POST 
app.get('/ultra', basicServices.getUltra);  //GET
app.post('/ultra', basicServices.postUltra); //POST 
app.get('/iot', database.getData);  //GET
app.get('/last', database.getLast);  //GET
app.post('/iot', database.addIoT); //POST 


//Redirección por defecto
app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

//Habilitar puerto de escucha para el servidor
var port = Number(process.env.PORT || 3000);
app.listen(port);
console.log('Listening on port ' + port + '...');
