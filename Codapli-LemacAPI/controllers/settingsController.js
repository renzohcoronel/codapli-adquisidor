var serial = require('./../Serial/SerialPort');
var serialConnector = require('./../Serial/SerialPort');
var setting = require('./../models/Setting');
var socket = require('./../socket').io();
var code_message = require('./../models/code_message');

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

// Setea los datos de los LVDTs en arduino
exports.settings_set_lvdts = async function (request, response) {
    
    serial.write(JSON.stringify({
        code: code_message.SET_LDVTS,
        lvdt0: request.body.lvdt0,
        lvdt1: request.body.lvdt1
    }));

    response.send({message:`message code sent: ${code_message.SET_LDVTS}`});
}


//Setea los datos de la CELDA en arduino
exports.settings_set_celda = function (request, response) {
    serial.write(JSON.stringify({
        code: code_message.SET_CELDA,
        celda: request.body.celda
     }));

     response.send({message:`message code sent: ${code_message.SET_CELDA}`});
}

//Setea la TARA en arduino
exports.settings_set_tara = function (request, response) {
    serial.write(JSON.stringify({
        code: code_message.SET_TARA
     }));

     response.send({message:`message code sent: ${code_message.SET_TARA}`});
}

//Setea el tiempo de muestreo de datos en arduino
exports.settings_set_time_muestreo = function (request, response) {
    serial.write(JSON.stringify({
        code: code_message.SET_TMUESTREO,
        time: request.body.time
     }));

     response.send({message:`message code sent: ${code_message.SET_TMUESTREO}`});
}


//--------------------------------------------------------


function readDataSerial(data) {
    bufferReader += data;
    var answers = bufferReader.split('\r\n');
    bufferReader = answers.pop();
    if (answers.length > 0) {
        try {
            console.log(answers[0]);
            let values = JSON.parse(answers[0]);
            if (values.code !== code_message.DATA_SENSOR) {
                socket.emit('arduino:setting', values);
            }
        } catch (error) {
            console.log("error parse json " + error.message);
        }


    }
}


