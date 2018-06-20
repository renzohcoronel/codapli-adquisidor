var fs = require('fs');
var os = require('os');
var serialConnector = require('./../Serial/SerialPort');
var Job = require('./../models/Job');
var socket = require('./../socket').io();
const path = require('path');
var serial;
var bufferReader = '';
var ensayo = null;
var file;


socket.on('connect', function(data) {
    console.log("Client connected");
});

exports.job_post = function (req, res) {
    console.log('post job');
    if (ensayo === null) {
        console.log('new job -->');
        ensayo = new Job();
        ensayo.pathFile = './ensayos/Ensayo_' + new Date().toISOString();
        ensayo.fecha = new Date().toLocaleDateString();
        ensayo.desplazamientImpueso = req.body.desplazamientImpueso;
        ensayo.tipoMuestra = req.body.tipoMuestra;
        ensayo.temperaturaEnsayo = req.body.temperaturaEnsayo;
        ensayo.registrando = false;
        try {
            openFile();
            res.send(JSON.stringify(ensayo));
            
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.send(JSON.stringify(ensayo));
    }


}

exports.job_get = function (req, res) {
    if (ensayo !== null) {
        res.send(JSON.stringify(ensayo));
    } else {
        res.status(500).send({message: 'No hay ensayo activo cree uno nuevo'});
    }
}

exports.jobs_get = function (req, res) {

    let jobs = new Array();
    fs.readdirSync(`./ensayos/`).forEach(file => {
        jobs.push(file);
    });
    res.send(JSON.stringify(jobs));


}

exports.jobs_get_values = function (req, res) {
    /**
     * Hay que reeimplementar esta endpoint
     * La idea es utilizarlo para reconstruir (leer) desde un archivo
     * para mostrar el ensayo realizado
     *  
     */
    // if (ensayo !== null) {
    //     res.send(JSON.stringify(ensayo));
    // } else {
    //     res.status(500).send({message:' No hay archivo de ensayo'});
    // }
}

exports.jobs_start = function (req, res) {

    serialConnector.getPortSerial().then(response =>{
        serial = response;
        serial.on('data', readDataSerial);
        serial.on('close', () => console.log("closed port"));          
        ensayo.registrando = true;
        res.send({ message: "Register values" });
    }).catch(error => {
        console.log('Error al abrir el puerto');
        ensayo.registrando = false;
        res.status(500).send({ message: error.message });
    
    });
}

exports.jobs_stop = function (req, res) {
    closeFile();
    serial.close();
    res.send({ message: "Closed Job" });
}

/* Funciones para abrir y cerrar el archivo 
    Recordar que se abre un solo archivo y si este no esta se crea
*/
function openFile() {
    console.log("open file " + ensayo.pathFile);
    fs.open(ensayo.pathFile, 'w+', (err, fd) => {
        if (err) {
            throw new Error('Error open file', ensayo.pathFile);
        } else {
            file = fd;
        }
    });

}

function closeFile() {
    fs.closeSync(file);
    ensayo = null;
}
//-------------------------------------------------------------------

function readDataSerial(data) {
    bufferReader += data;
    var answers = bufferReader.split('\r\n');
    bufferReader = answers.pop();
    if (answers.length > 0) {
        try {
            console.log(answers[0]);
            let values = JSON.parse(answers[0]);
            if (values.tipo === 'datos') {
                const timeMuestra = new Date().toTimeString();
                let csv = `${ensayo.fecha},${ensayo.desplazamientImpueso},${ensayo.tipoMuestra},${ensayo.temperaturaEnsayo}
                ,${values.celda},${values.ldvt0},${values.ldvt1},${timeMuestra}${os.EOL}`;
                fs.writeSync(file, csv);
                ensayo.values.push(values);
                values.time = timeMuestra;
                socket.emit('arduino:data',values);
            }
        } catch (error) {
            console.log("error parse json " + error.message);
        }


    }
}

exports.removeFileJob = (req, res) => {
    
    const filePath =`./ensayos/${req.params.file}`;
    console.log('Remove file --> ', filePath);
    fs.exists(filePath, function(exists) {
        if(exists) {
          console.log('File exists. Deleting now ...');
          fs.unlinkSync(filePath);
          res.send(JSON.stringify({ message: "File remove" }));
        } else {
            res.status(500).send(JSON.stringify({ message: "File not exitst" }));
        }
      });
}

/**
 * Falta implementar el metodo en el front para descargar el archivo
 * Basicamente responde con un atachment en la respuesta http
 */
exports.downloadFile = (req, res) => {

    var file = req.params.file;
    var fileLocation = path.join('./ensayos',file);
    console.log(fileLocation);
    fs.exists(fileLocation, function(exists) {
        if(exists) {
          console.log('File exists. Download now ...');    
          res.download(fileLocation, file);   
        } else {
            res.status(500).send({ message: "File not exitst" });
        }
      });

}