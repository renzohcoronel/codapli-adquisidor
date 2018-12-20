var fs = require('fs');
var os = require('os');
var Job = require('./../models/Job');
var socket = require('./../socket').io();
var code_message = require('./../models/code_message');
const path = require('path');
var port = require('./../app.js');
var moment = require('moment');
var documentoPDF = require('pdfkit');

var bufferReader = '';
var ensayo = null;
var file;

var last_value = {
    time: moment(new Date()).format("hh:mm:ss"),
    celda: 0,
    lvdt0: 0,
    lvdt1: 0
}
var myInterval;



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
        ensayo.pathFile = './ensayos/EnsayoLemac-' + date + '-' + req.body.tipoEnsayo + '.csv';
        ensayo.fecha = date;
        ensayo.registrando = false;
        //Informacion propiamente del ensayo
        ensayo.tipoEnsayo = req.body.tipoEnsayo;
        switch (ensayo.tipoEnsayo) {
            case 'APERTURA_Y_CIERRE':

                ensayo.alto = req.body.alto;
                ensayo.ancho = req.body.ancho;
                ensayo.profundidad = req.body.profundidad;
                ensayo.material = req.body.material;
                ensayo.temperatura = req.body.temperatura;
                ensayo.recorridoPlaca = req.body.recorridoPlaca;

                break;
            case 'MODULO_RIGIDEZ':

                ensayo.material = req.body.material;
                ensayo.frecuencia = req.body.frecuencia;
                ensayo.alto = req.body.alto;
                ensayo.ancho = req.body.ancho;
                ensayo.profundidad = req.body.profundidad;
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
        jobs.push({ file: file, name: fileSplit[0], date: fileSplit[1], tipo: fileSplit[2] });
    });
    res.send(JSON.stringify(jobs));


}

exports.jobs_get_values = function (req, res) {
    let celda = [];
    let lvdt0 = [];
    let lvdt1 = [];
    let time = [];

    console.log(req.params.fileJob);

   const file = fs.readFileSync(`./ensayos/${req.params.fileJob}`, 'utf-8').split(`${os.EOL}`);
   file.forEach((line,index)=>{
       if(index>1){   
           let lineArray = line.split(',',4);
           celda.push(+lineArray[0]);
           lvdt0.push(+lineArray[1]);
           lvdt1.push(+lineArray[2]);
           time.push(lineArray[3]);
        }
    });

    const json = {

       celdas : celda , 
       lvdt0 : lvdt0 ,
       lvdt1 : lvdt1 , 
       time : time
     
    };
     res.send(json);

}

exports.jobs_start = function (req, res) {
    console.log("Post start Job");
    port.Serial.on('data', readDataSerial);
    
    myInterval = setInterval(()=>{
         let registro = `${last_value.celda},${last_value.lvdt0},${last_value.lvdt1},${last_value.time}${os.EOL}`;
         fs.writeSync(file, registro);
         ensayo.values.push(last_value);
         socket.emit('arduino:graph_value', last_value);

    },10000);
    
    ensayo.registrando = true;
    res.send({ message: "Registrando Valores" });
}

exports.jobs_stop = function (req, res) {
    closeFile();
    port.Serial.removeAllListeners( 'data' )
    clearInterval(myInterval);
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
                    firstLine = `fecha | tipo | alto | ancho | profundidad | material | temperatura | recorridoPlaca${os.EOL}`;
                    header = `${ensayo.fecha},${ensayo.tipoEnsayo},${ensayo.alto},${ensayo.ancho},${ensayo.profundidad},${ensayo.material},${ensayo.temperatura},${ensayo.recorridoPlaca}${os.EOL}`;
                    break;
                case 'MODULO_RIGIDEZ':
                    firstLine = `fecha | tipo | alto | ancho | profundidad | temperatura | frecuencia | carga | material | muestra${os.EOL}`;
                    header = `${ensayo.fecha},${ensayo.tipoEnsayo},${ensayo.alto},${ensayo.ancho},${ensayo.profundidad},${ensayo.temperatura},${ensayo.frecuencia},${ensayo.carga},${ensayo.material},${ensayo.muestra}${os.EOL}`;
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
    if (file) {
        fs.closeSync(file);
        ensayo = null;
    }
}
//-------------------------------------------------------------------

function readDataSerial(data) {
    bufferReader += data;
    var answers = bufferReader.split('\n');
    bufferReader = answers.pop();
    if (answers.length > 0) {
        try {
           // console.log(answers[0]);
            let values = JSON.parse(answers[0]);
            if (values.code === code_message.DATA_SENSOR) {
                last_value.time =  moment(new Date()).format("hh:mm:ss");
                last_value.celda = (values.celda).toFixed(2);
                last_value.lvdt0 = values.lvdt0;
                last_value.lvdt1 = values.lvdt1;            
                socket.emit('arduino:data', last_value);
            }
        } catch (error) {
            console.log("error parse json " + error.message);
        }
        bufferReader = '';
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
    fs.exists(fileLocation, (exists) => {
        if (exists) {
            console.log('File exists. Download now ...');
            res.download(fileLocation, file);
        } else {
            res.status(500).send({ message: "File not exitst" });
        }
    });

}

exports.createdReport = (req, res) => {
   // console.log("QUERY:", req.query)
    const filePath = `./ensayos/${req.query.file}`;

    res.statusCode = 200;
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-disposition', 'attachment; filename=reporte.pdf');


    var doc = new documentoPDF();
    doc.pipe(res);
    doc.font('Courier');
    doc.fontSize(14);
    doc.text('Hola Mundo, creando pdf desde nodejs');
    doc.end();

}