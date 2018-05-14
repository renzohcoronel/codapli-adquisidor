var fs = require('fs');
var os = require('os');
var serialConnector = require('./../Serial/SerialPort');
var Job = require('./../models/Job');
var socket = require('./../socket').io();
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
        ensayo.fecha = new Date();
        ensayo.desplazamientImpueso = req.body.desplazamientImpueso;
        ensayo.tipoMuestra = req.body.tipoMuestra;
        ensayo.temperaturaEnsayo = req.body.temperaturaEnsayo;
        ensayo.registrando = false;
        openFile();
        res.send(JSON.stringify(ensayo));
    } else {
        res.send(JSON.stringify(ensayo));
    }


}

exports.job_get = function (req, res) {
    if (ensayo !== null) {
        res.send(JSON.stringify(ensayo));
    } else {
        res.send(JSON.stringify("{'message': 'Not ensayo avaireable'}"))
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
    if (ensayo !== null) {
        res.send(JSON.stringify(ensayo));
    } else {
        res.status(500).send(JSON.stringify(`'message':' not Ensayo avaireable'`));
    }
}

exports.jobs_start = function (req, res) {
    try {
        serial = serialConnector.getPortSerial();
        serial.on('data', readDataSerial);
        serial.on('close', () => console.log("closed port"));
        ensayo.registrando = true;
    
        res.send(JSON.stringify({ "message": "Register values" }));
        
    } catch (error) {
        res.status(500).send(JSON.stringify({ "message": "Register values" }));
    }
}

exports.jobs_stop = function (req, res) {
    closeFile();
    serial.close();
    res.send(JSON.stringify({ "message": "Closed Job" }))
}

function openFile() {
    console.log("open file " + ensayo.pathFile);
    fs.open(ensayo.pathFile, 'w+', (err, fd) => {
        if (err) {
            console.log(err.message)
        } else {
            file = fd;
        }
    });

}

function closeFile() {
    fs.closeSync(file);
    ensayo = null;
}


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
                let csv = `${ensayo.fecha.toISOString()},${ensayo.desplazamientImpueso},${ensayo.tipoMuestra},${ensayo.temperaturaEnsayo}
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