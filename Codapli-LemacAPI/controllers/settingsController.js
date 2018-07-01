var serial = require('./../Serial/SerialPort');
var serialConnector = require('./../Serial/SerialPort');
var setting = require('./../models/Setting');
var socket = require('./../socket').io();

var serial;
var bufferReader = '';
/**
 *  CODAPLI - Manejamos la comunicacion del arduino
 * por eso cada vez que accedemos a las configuraciones abrimos una conexion con el puerto serie
 * para leer los datos cargados en el dispositivo y poder enviar datos nuevos
 * 
 * */
exports.initSerial = (req, res) => {
        serialConnector.getPortSerial().then(response =>{
            serial = response;
            serial.on('data', readDataSerial);
            serial.on('close', () => console.log("closed port"));          
            res.send(JSON.stringify({ "message": "open serial port" }));
        }).catch(error => {
            console.log('Error al abrir el puerto');
            res.status(500).send(JSON.stringify({ "message": error.message }));
        
        });

}

exports.closeSerial = (req, res) => {
    serial.close();
    res.send(JSON.stringify({ "message": "close serial port" }))
}

//--------------------------------------------------------------------------------------

// Lee los datos de configuracion cargados actualmente
exports.settings_get = function (req, res) {
    serial.write(JSON.stringify({
        "estado": 101
     }));

     res.send(JSON.stringify({'message':'write estado:101'}));
}
// Envia para cargar los nuevos datos de configuracion del equipo
exports.settings_post = function (req, res) {
   serial.write(JSON.stringify({
      "estado": 100,
      "calibration_factor_celda": req.body.calibration_factor_celda,
      "calibration_factor_ldvt0": req.body.calibration_factor_ldvt0,
      "calibration_factor_ldvt1": req.body.calibration_factor_ldvt1
   }));
   res.send(JSON.stringify({"message": "writed message"}));
}

// Falta implementar la tara de la celda de cargar
// Este metodo se deberia correr al iniciar la lectura del ensayo
exports.settings_post_tare = function (req, res) {
    res.send("oks")
}
// Seria para setear el pamaetro de escala para la celda de carga
exports.settings_post_scale = function (req, res) {
    res.send("oks")
}


function readDataSerial(data) {
    bufferReader += data;
    var answers = bufferReader.split('\r\n');
    bufferReader = answers.pop();
    if (answers.length > 0) {
        try {
            console.log(answers[0]);
            let values = JSON.parse(answers[0]);
            if (values.tipo === 'setting') {
                socket.emit('arduino:setting', values);
            }
        } catch (error) {
            console.log("error parse json " + error.message);
        }


    }
}


