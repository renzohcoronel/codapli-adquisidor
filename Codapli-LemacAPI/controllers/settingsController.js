var setting = require('./../models/Setting');
var socket = require('./../socket').io();
var code_message = require('./../models/code_message');

var port = require('./../app.js');
var bufferReader = '';
var json = JSON.stringify({});

/**
 *  CODAPLI - Manejamos la comunicacion del arduino
 * por eso cada vez que accedemos a las configuraciones abrimos una conexion con el puerto serie
 * para leer los datos cargados en el dispositivo y poder enviar datos nuevos
 * 
 * */
exports.initSerial = (req, res) => {
    port.Serial.write(json);
    port.Serial.on('data', readDataSerial);
    res.send({ message: "Leyendo valores" });
}

exports.closeSerial = (req, res) => {
    port.Serial.removeAllListeners( 'data' );
    res.send({ message: "Removido lectura" });
}

//--------------------------------------------------------------------------------------

// Setea los datos de los LVDTs en arduino
exports.settings_set_lvdts = async function (request, response) {
    const json = JSON.stringify({
        code: code_message.SET_LDVTS,
        lvdt0: request.body.lvdt0.value,
        lvdt1: request.body.lvdt1.value
    })
    port.Serial.write(json);
    response.send({message:`message code sent: ${code_message.SET_LDVTS}`});
}


//Setea los datos de la CELDA en arduino
exports.settings_set_celda = function (request, response) {
    port.Serial.write(JSON.stringify({
        code: code_message.SET_CELDA,
        celda: request.body.celda
     }));
     response.send({message:`message code sent: ${code_message.SET_CELDA}`});
}

//Setea la TARA en arduino
exports.settings_set_tara = function (request, response) {
    port.Serial.write(JSON.stringify({
        code: code_message.SET_TARA
     }));

     response.send({message:`message code sent: ${code_message.SET_TARA}`});
}
//--------------------------------------------------------

function readDataSerial(data) {
    bufferReader += data;
    var answers = bufferReader.split('\r');

    bufferReader = answers.pop();
    if (answers.length > 0) {
        try {

            let values = JSON.parse(answers[0]);
            if (values.code === code_message.DATA_SENSOR) {
                socket.emit('arduino:data', values);
            } else if (values.code === code_message.CODAPLIOK) {
                socket.emit('arduino:settings_ok', values);
            } else if (values.code === code_message.CODAPLIERROR) {
                socket.emit('arduino:settings_error', values);
            }
        } catch (error) {
            console.log("error parse json " + error.message);
        }
        bufferReader="";

    }
}


