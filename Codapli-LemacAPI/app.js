var express = require('express');
var app = express();
var router = require('./routes/routes')
//--------------------------------------------------
var serial = require('./Serial/SerialPort.js');
var setting = require('./models/Setting');

//----------------------------------------------

app.listen(8082, function () {
  console.log('Example app listening on port 3000!');

});
app.use('/', router);







