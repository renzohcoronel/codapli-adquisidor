var SerialPort = require('serialport');
module.exports.getPortSerial = function () {
    var pathPort = '/dev/ttyACM0';
    var bufferReader = '';
    const Readline = SerialPort.parsers.Readline;
    const parser = new Readline();
    var port = new SerialPort(pathPort, {
        baudRate: 115200
    }, (err) => {
        if (err) {
            throw 'No se pudo abrir el puerto ';
        } else {
            console.log('Puerto Abierto ' + pathPort );
        }
    });
    
    port.pipe(parser);

    return port;
}


