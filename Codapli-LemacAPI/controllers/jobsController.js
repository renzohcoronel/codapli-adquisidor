var fs = require('fs');
var os = require('os');
var serialConnector = require('./../Serial/SerialPort');
var Job = require('./../models/Job');

var serial;
var bufferReader = '';
var ensayo;
var file;

exports.job_post = function (req, res) {
    if(ensayo!==null){
        console.log(req.body.desplazamientImpueso);
        
        ensayo = new Job();
        ensayo.pathFile = './ensayos/Ensayo_' + new Date().toISOString();
        ensayo.fecha = new Date();
        ensayo.desplazamientImpueso = req.body.desplazamientImpueso;
        ensayo.tipoMuestra = req.body.tipoMuestra;
        ensayo.temperaturaEnsayo = req.body.temperaturaEnsayo;
        ensayo.registrando = false;
    } 
    openFile();
    res.send(JSON.stringify(ensayo));

}

exports.job_get = function (req, res) {
    res.send("oks")
}

exports.jobs_get = function (req, res) {
    res.send("oks")
}

exports.jobs_get_values = function (req, res) {
    res.send("oks")
}

exports.jobs_start = function (req, res) {
    serial = serialConnector.getPortSerial();
    serial.on('data',readDataSerial);
    serial.on('close', () => console.log("closed port"));
    ensayo.registrando = true;

    res.send(JSON.stringify({ "message": "registrando"}))
}

exports.jobs_stop = function (req, res) {
    closeFile();
    serial.close();

    res.send("Close")
}

function openFile(){
        console.log("open file " + ensayo.pathFile);
        fs.open(ensayo.pathFile,'w+', (err,fd)=> {
            if(err){
                console.log(err.message)
            } else {
                file = fd;
            }
        });       
        
}

function closeFile(){
    fs.closeSync(file);
    ensayo = null;
}


function readDataSerial(data) {
    bufferReader += data;
    var answers = bufferReader.split('\r\n');
    bufferReader = answers.pop();
    if (answers.length > 0) {
        fs.writeSync(file,answers[0] + os.EOL);
        
    }
}