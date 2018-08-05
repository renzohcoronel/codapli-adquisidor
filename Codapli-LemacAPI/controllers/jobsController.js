var fs = require('fs');
var os = require('os');
var serialConnector = require('./../Serial/SerialPort');
var Job = require('./../models/Job');
var socket = require('./../socket').io();
var code_message = require('./../models/code_message');
const path = require('path');
var serial;
var bufferReader = '';
var ensayo = null;
var file;


socket.on('connect', function (data) {
    console.log("Client connected");
});

exports.job_post = function (req, res) {
    console.log('post job');
    if (ensayo === null) {
        console.log('new job -->');
        ensayo = new Job();
        //Datos utiles para comenzar con el ensayo
        date = new Date().toISOString();
        ensayo.pathFile = './ensayos/EnsayoLemac-' + date + '-' + req.body.tipoEnsayo+'.csv';
        ensayo.fecha = date;
        ensayo.registrando = false;
        //Informacion propiamente del ensayo
        ensayo.tipoEnsayo = req.body.tipoEnsayo;
        switch (ensayo.tipoEnsayo) {
            case 'APERTURA_Y_CIERRE':

                ensayo.dimensiones = req.body.dimensiones;
                ensayo.material = req.body.material;
                ensayo.temperatura = req.body.temperatura;
                ensayo.recorridoPlaca = req.body.recorridoPlaca;

                break;
            case 'MODULO_RIGIDEZ':

                ensayo.material = req.body.material;
                ensayo.frecuencia = req.body.frecuencia;
                ensayo.dimensiones = req.body.dimensiones;
                ensayo.carga = req.body.carga;
                ensayo.muestra = req.body.muestra;
                ensayo.temperatura = req.body.temperatura;

                break;
            case 'SEMI_PROBETA':

                ensayo.material = req.body.material;
                ensayo.diametro = req.body.diametro;
                ensayo.espesor = req.body.espesor;
                ensayo.ranura = req.body.ranura;
                ensayo.muestra = req.body.muestra;

                break;
            default:
                console.log('Error al crear el ensayo')
                break;
        }
        //----------------------------------------------------------------

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
        console.log("GET_JOB --> response");
        res.send(ensayo);
    } else {
        res.status(500).send({ message: 'No hay ensayo activo cree uno nuevo' });
    }
}

exports.jobs_get = function (req, res) {

    let jobs = new Array();
    fs.readdirSync(`./ensayos/`).forEach(file => {
        const fileSplit = file.split('-');
        jobs.push({ file: file, name: fileSplit[0], date: fileSplit[1], tipo: fileSplit[2]});
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
    console.log("Post start Job");
    serialConnector.getPortSerial().then(response => {
        serial = response;
        serial.on('data', readDataSerial);
        serial.on('close', () => console.log("closed port"));
        ensayo.registrando = true;
        res.send({ message: "Registrando Valores" });
    }).catch(error => {
        console.log(error);
        ensayo.registrando = false;

        res.status(500).send({ message: error.message });

    });
}

exports.jobs_stop = function (req, res) {
    closeFile();
    serial? serial.close(): serial;
    res.send({ message: "Ensayo terminado" });
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
            let firstLine;
            let header;
            //Para no almacenar siempre todos los datos en el primer registro vasmoa almacenar los datos del trabajo
            switch (ensayo.tipoEnsayo) {
                case 'APERTURA_Y_CIERRE':
                    firstLine = `fecha | tipo | dimensiones | material | temperatura | recorridoPlaca${os.EOL}`;
                    header = `${ensayo.fecha},${ensayo.tipoEnsayo},${ensayo.dimensiones},${ensayo.material},${ensayo.temperatura},${ensayo.recorridoPlaca}${os.EOL}`;
                    break;
                case 'MODULO_RIGIDEZ':
                    firstLine = `fecha | tipo | dimensiones | temperatura | frecuencia | carga | material | muestra${os.EOL}`;
                    header = `${ensayo.fecha},${ensayo.tipoEnsayo},${ensayo.dimensiones},${ensayo.temperatura},${ensayo.frecuencia},${ensayo.carga},${ensayo.material},${ensayo.muestra}${os.EOL}`;
                    break;
                case 'SEMI_PROBETA':
                    firstLine = `fecha | tipo | muestra | material | diametro | espesor | ranura | ${os.EOL}`;
                    header = `${ensayo.fecha},${ensayo.tipoEnsayo},${ensayo.muestra},${ensayo.material},${ensayo.diametro},${ensayo.espesor},${ensayo.ranura}${os.EOL}`;
                    break;

                default:
                    header = 'with out header error';
                    break;
            }
            fs.writeSync(file, firstLine);
            fs.writeSync(file, header);
        }
    });
}


function closeFile() {
    if(file){
        fs.closeSync(file);
        ensayo = null;
    } 
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
            if (values.code === code_message.DATA_SENSOR_WORK) {
                const timeMuestra = new Date().toTimeString();
                //Ahora solamente guardamos los valores de los sensores
                // ya en la cabecera guardamos los datos del ensayo
                let registro = `${values.celda},${values.ldvt0},${values.ldvt1},${timeMuestra}${os.EOL}`;
                fs.writeSync(file, registro);
                ensayo.values.push(values);
                values.time = timeMuestra;
                socket.emit('arduino:data', values);
            }
        } catch (error) {
            console.log("error parse json " + error.message);
        }


    }
}

exports.removeFileJob = (req, res) => {

    const filePath = `./ensayos/${req.params.file}`;
    console.log('Remove file --> ', filePath);
    fs.exists(filePath, function (exists) {
        if (exists) {
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
    var fileLocation = path.join('./ensayos', file);
    console.log(fileLocation);
    fs.exists(fileLocation, function (exists) {
        if (exists) {
            console.log('File exists. Download now ...');
            res.download(fileLocation, file);
        } else {
            res.status(500).send({ message: "File not exitst" });
        }
    });

}