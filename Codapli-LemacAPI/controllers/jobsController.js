var fs = require('fs');
var os = require('os');
var serialConnector = require('./../Serial/SerialPort');
var Job = require('./../models/Job');

var serial;
var bufferReader = '';
var ensayo;
var file;

exports.job_post = function (req, res) {
    if (ensayo !== null) {
        ensayo = new Job();
        ensayo.pathFile = './ensayos/Ensayo_' + new Date().toISOString();
        ensayo.fecha = new Date();
        ensayo.desplazamientImpueso = req.body.desplazamientImpueso;
        ensayo.tipoMuestra = req.body.tipoMuestra;
        ensayo.temperaturaEnsayo = req.body.temperaturaEnsayo;
        ensayo.registrando = false;
        openFile();
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
        res.send(JSON.stringify(`'message':' not Ensayo avaireable'`));
    }
}

exports.jobs_start = function (req, res) {
    serial = serialConnector.getPortSerial();
    serial.on('data', readDataSerial);
    serial.on('close', () => console.log("closed port"));
    ensayo.registrando = true;

    res.send(JSON.stringify({ "message": "registrando" }))
}

exports.jobs_stop = function (req, res) {
    closeFile();
    serial.close();

    res.send("Close")
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
            let values = JSON.parse(file, answers[0]);
            if (values.tipo === 'datos') {
                let csv = `${ensayo.fecha},${ensayo.desplazamientImpueso},${ensayo.tipoMuestra},${ensayo.temperaturaEnsayo}
                ,${values.celda},${values.ldvt0},${values.ldvt1}${os.EOL}`;
                fs.writeSync(file, csv);
                ensayo.values.push(values);
            }
        } catch (error) {
            console.log("error parse json " + error.message);
        }


    }
}