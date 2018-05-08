var express = require('express');
var app = express();
var bodyParser     =        require("body-parser");
var router = require('./routes/routes');


//--------------------------------------------------
var serial = require('./Serial/SerialPort.js');
var setting = require('./models/Setting');

//----------------------------------------------

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(8080, function () {
  console.log('Example app listening on port 3000!');

});
app.use('/', router);







