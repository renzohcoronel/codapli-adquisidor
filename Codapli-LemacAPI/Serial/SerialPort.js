
var events = require('events');
const EventEmitter = require('events').EventEmitter;
var SerialPort = require('serialport');
var setting = require('./../models/Setting.js');

// create an instance of the EventEmitter object
const eventEmitter = new EventEmitter();


// --- Settings Serial PORT -------------------------------
var pathPort = '/dev/ttyACM0';
var bufferReader = '';
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

var port = new SerialPort(pathPort, {
    baudRate: 115200
}, (err) => {
    if(err){
        console.log('No se pudo abrir el puerto ' + pathPort);
    } else {
        console.log('Puerto Abierto ' + pathPort)
    }
});

port.pipe(parser);

// port.on('data', function (data) {
//     bufferReader += data;
//     var answers = bufferReader.split('\r\n');
//     bufferReader = answers.pop(); 
//     if(answers.length>0){
//         console.log(answers);
//         eventEmitter.emit('datos', answers[0]);
        
//     }

// });

//--------------------------------------------------------------------
// EMITTER ARDUINO ------

// register a listener for the 'randomString' event
// eventEmitter.on('arduinoEmitter', function (value) {
//         try {
//             const jsonMessage = JSON.parse(value);
//             if(jsonMessage.type === 'setting'){
//                 setting.calibration_factor_celda = jsonMessage.calibration_factor_celda;
//                 setting.calibration_factor_ldvt0 = jsonMessage.calibration_factor_ldvt0;
//                 setting.calibration_factor_ldvt1 = jsonMessage.calibration_factor_ldvt1;
//             } else if(jsonMessage.type === 'datos'){

//             }

//         } catch (error) {
//             console.log(value);
//             console.log(error);
//         }
//   })

module.exports = port;


