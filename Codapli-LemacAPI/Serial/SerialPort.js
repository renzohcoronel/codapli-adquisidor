
var SerialPort = require('serialport');
module.exports.getPortSerial = function () {
    
    return new Promise( (resolve, reject) => {

        var pathPort = '/dev/ttyACM1';
        //var pathPort = '/dev/pts/7';
        var bufferReader = '';
        const Readline = SerialPort.parsers.Readline;
        const parser = new Readline('\n');
        var port = new SerialPort(pathPort, {
            baudRate: 115200,
            parser : parser
        }, (err) => {
            if (err) {
                reject(new Error('No se pudo abrir el puerto serie'));
            } else {
                console.log('Puerto Abierto ' + pathPort );          
                resolve(port);
            }
        });



    });
        
}


