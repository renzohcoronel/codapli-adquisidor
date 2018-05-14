var serial = require('./../Serial/SerialPort');
var serialConnector = require('./../Serial/SerialPort');
var setting = require('./../models/Setting');
var socket = require('./../socket').io();

var serial;
var bufferReader = '';

exports.initSerial = (req, res) => {
    try {
        serial = serialConnector.getPortSerial();
        serial.on('data', readDataSerial);
        serial.on('close', () => console.log("closed port"));
        
        res.send(JSON.stringify({ "message": "open serial port" }));

    } catch (error) {
        res.status(500).send(JSON.stringify({ "message": error.message }));
    }
}

exports.closeSerial = (req, res) => {
    serial.close();
    res.send(JSON.stringify({ "message": "close serial port" }))
}

exports.settings_get = function (req, res) {
    serial.write(JSON.stringify({
        "estado": 101
     }));
}

exports.settings_post = function (req, res) {
   serial.write(JSON.stringify({
      "estado": 100,
      "calibration_factor_celda": req.body.calibration_factor_celda,
      "calibration_factor_ldvt0": req.body.calibration_factor_ldvt0,
      "calibration_factor_ldvt1": req.body.calibration_factor_ldvt1
   }));
   res.send(JSON.stringify({"message": "writed message"}));
}

exports.settings_post_tare = function (req, res) {
    res.send("oks")
}


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

