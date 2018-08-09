var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('./socket').start(server);

var bodyParser = require("body-parser");
var router = require('./routes/routes');

var serialConector = require('./Serial/SerialPort.js');
var serial;
var setting = require('./models/Setting');

//----------------------------------------------

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use('/api', router);



//--------------------------------------------------
const port = 5001

server.listen(port, function(){
    console.log('Server is running Port:',port);
  
});

serialConector.getPortSerial().then(response => {
  serial = response;
  serial.on('close', () => console.log("closed port"));
  module.exports.Serial = serial;
}).catch(error =>{ 
    console.log(error);
});


