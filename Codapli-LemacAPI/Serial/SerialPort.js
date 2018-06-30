/*
    Clase para poder manejar la comunicacion con el puerto serie 
    Ref: https://es.wikipedia.org/wiki/Puerto_serie
    Modulo usado: https://www.npmjs.com/package/serialport 
    V:6.2.0
*/

var SerialPort = require('serialport');
module.exports.getPortSerial = function () {
    
    return new Promise( (resolve, reject) => {

        // var pathPort = '/dev/ttyACM0';
        var pathPort = '/dev/pts/9';
        var bufferReader = '';
        const Readline = SerialPort.parsers.Readline;
        const parser = new Readline();
        var port = new SerialPort(pathPort, {
            baudRate: 115200
        }, (err) => {
            if (err) {
                reject(new Error('No se pudo abrir el puerto serie'));
            } else {
                console.log('Puerto Abierto ' + pathPort );
                port.pipe(parser);
                
                resolve(port);
            }
        });
    });
        
}


