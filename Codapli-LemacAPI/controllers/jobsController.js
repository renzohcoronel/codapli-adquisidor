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
var contador_apertura_cierre = 0;
var bool_media_apertura_cierre = false;

var last_value = {
    time: moment(new Date()).format("hh:mm:ss"),
    celda: 0,
    celdaSet:0,
    lvdt0: 0,
    lvdt0Set:0,
    lvdt1: 0,
    lvdt1Set:0,
    apertura_y_cierre:0
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
    let numjob;
    let array1 = [];
    let jobs = new Array();
    fs.readdirSync(`./ensayos/`).forEach(file => {
        const fileSplit = file.split('-');
        const fileDay = fileSplit[3].slice(0, 2);
        const fileType = fileSplit[4].slice(0, -4);
        const fileDate = fileDay+'-'+fileSplit[2]+'-'+fileSplit[1];
        jobs.push({ file: file, name: fileSplit[0], date: fileDate, tipo: fileType });
    });
    for (numjob = jobs.length-1; numjob >= 0 ; numjob--) {
        array1.push(jobs[numjob]);
    }
    
    res.send(JSON.stringify(array1));


}

exports.jobs_get_values = function (req, res) {
    let header = {};
    let celda = [];
    let lvdt0 = [];
    let lvdt1 = [];
    let time = [];
    let apertura_y_cierre = 0;
    let ayp = false;

    console.log(req.params.fileJob);

   const file = fs.readFileSync(`./ensayos/${req.params.fileJob}`, 'utf-8').split(`${os.EOL}`);
   file.forEach((line,index)=>{

    if(index==1){   
        let lineArray = line.split('|');
        switch (lineArray[1]) {
            case 'APERTURA_Y_CIERRE':
                header = {
                    tipoEnsayo: lineArray[1],
                    alto: lineArray[2],
                    ancho: lineArray[3],
                    profundidad: lineArray[4],
                    material: lineArray[5],
                    temperatura: lineArray[6],
                    recorridoPlaca: lineArray[7]

                }
                ayp = true;

                break;
            case 'MODULO_RIGIDEZ':
            header = {
                tipoEnsayo: lineArray[1],
                material : lineArray[8],
                frecuencia : lineArray[6],
                alto: lineArray[2],
                ancho : lineArray[3],
                profundidad : lineArray[4],
                carga: lineArray[7],
                muestra: lineArray[9],
                temperatura: lineArray[5]
            }
                break;
            case 'SEMI_PROBETA':
            header = {
                tipoEnsayo: lineArray[1],
                material: lineArray[3],
                diametro: lineArray[4],
                espesor: lineArray[5],
                ranura: lineArray[6],
                muestra: lineArray[2]
            }
        }
     } else if(index>2){   
           let lineArray = line.split('|',4);  
           if(ayp){
               if(lineArray[0] != 'APYCIERRE'){
                celda.push(+lineArray[0]);
                lvdt0.push(+lineArray[1]);
                lvdt1.push(+lineArray[2]);
                time.push(lineArray[3]);
               } else {
                   apertura_y_cierre = lineArray[3];
               }
           } else {
            celda.push(+lineArray[0]);
            lvdt0.push(+lineArray[1]);
            lvdt1.push(+lineArray[2]);
            time.push(lineArray[3]);
           }   
        }
    });

    const json = {
       header : header,
       values : {
           celdas : celda , 
           lvdt0 : lvdt0 ,
           lvdt1 : lvdt1 , 
           time : time
       },
       apycierre: apertura_y_cierre
     
    };
     res.send(json);

}

exports.jobs_start = function (req, res) {
    console.log("Post start Job");
    port.Serial.on('data', readDataSerial);
    
    myInterval = setInterval(()=>{
         let registro = `${last_value.celda}|${last_value.lvdt0}|${last_value.lvdt1}|${last_value.time}${os.EOL}`;
         fs.writeSync(file, registro);
         ensayo.values.push(last_value);
         socket.emit('arduino:graph_value', last_value);

    },10000);
    
    ensayo.registrando = true;
    res.send({ message: "Registrando Valores" });
}

exports.jobs_stop = function (req, res) {
    if(ensayo.tipoEnsayo == 'APERTURA_Y_CIERRE'){
        let lastLine = `APYCIERRE|=|=|${contador_apertura_cierre}${os.EOL}`
        fs.writeSync(file, lastLine);
    }    
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
            let thirdLine;
            let header;
            //Para no almacenar siempre todos los datos en el primer registro vasmoa almacenar los datos del trabajo
            switch (ensayo.tipoEnsayo) {
                case 'APERTURA_Y_CIERRE':
                    firstLine = `fecha | tipo | alto | ancho | profundidad | material | temperatura | recorridoPlaca${os.EOL}`;
                    thirdLine = `celda | lvdt1 | lvdt2 | instante${os.EOL}`;
                    header = `${ensayo.fecha}|${ensayo.tipoEnsayo}|${ensayo.alto}|${ensayo.ancho}|${ensayo.profundidad}|${ensayo.material}|${ensayo.temperatura}|${ensayo.recorridoPlaca}${os.EOL}`;
                    break;
                case 'MODULO_RIGIDEZ':
                    firstLine = `fecha | tipo | alto | ancho | profundidad | temperatura | frecuencia | carga | material | muestra${os.EOL}`;
                    thirdLine = `celda | lvdt1 | lvdt2 | instante${os.EOL}`;
                    header = `${ensayo.fecha}|${ensayo.tipoEnsayo}|${ensayo.alto}|${ensayo.ancho}|${ensayo.profundidad}|${ensayo.temperatura}|${ensayo.frecuencia}|${ensayo.carga}|${ensayo.material}|${ensayo.muestra}${os.EOL}`;
                    break;
                case 'SEMI_PROBETA':
                    firstLine = `fecha | tipo | muestra | material | diametro | espesor | ranura | ${os.EOL}`;
                    thirdLine = `celda | lvdt1 | lvdt2 | instante${os.EOL}`;
                    header = `${ensayo.fecha}|${ensayo.tipoEnsayo}|${ensayo.muestra}|${ensayo.material}|${ensayo.diametro}|${ensayo.espesor}|${ensayo.ranura}${os.EOL}`;
                    break;

                default:
                    header = 'with out header error';
                    break;
            }
            fs.writeSync(file, firstLine);
            fs.writeSync(file, header);
            fs.writeSync(file, thirdLine);
        }
    });
}


function closeFile() {
    if (file) {
        fs.closeSync(file);
        ensayo = null;
        contador_apertura_cierre = 0;
        bool_media_apertura_cierre = false;
    }
}
//-------------------------------------------------------------------

function readDataSerial(data) {
    bufferReader += data;
    var answers = bufferReader.split('\r\n');
    bufferReader = answers[0];
    if (answers.length > 1) {
        try {
           // console.log(answers[0]);
            let values = JSON.parse(answers[0]);
            if (values.code === code_message.DATA_SENSOR) {
                last_value.time =  moment(new Date()).format("hh:mm:ss");
                last_value.celda = (values.celda).toFixed(2);
                last_value.celdaSet = values.celdaSet;
                last_value.lvdt0 = values.lvdt0;
                last_value.lvdt0Set = values.lvdt0Set;
                last_value.lvdt1 = values.lvdt1;      
                last_value.lvdt1Set = values.lvdt1Set;
                if(ensayo.tipoEnsayo == 'APERTURA_Y_CIERRE'){
                    if(values.lvdt0 >= 2.4){
                        bool_media_apertura_cierre = true;
                    }

                    if((values.lvdt0 <= -2.4)&&(bool_media_apertura_cierre)){
                        contador_apertura_cierre = contador_apertura_cierre + 1;
                        bool_media_apertura_cierre = false;
                    }
                }
                last_value.apertura_y_cierre = contador_apertura_cierre; 
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

exports.downloadFile = (req, res) => {

    var file = req.params.file;
    var fileLocation = path.join('./ensayos', file);
    console.log(fileLocation);
    fs.exists(fileLocation, (exists) => {
        if (exists) {
            console.log('File exists. Download now ...');
            res.setHeader('Content-disposition', 'attachment; filename='+file);
            res.download(fileLocation, file);
        } else {
            res.status(500).send({ message: "File not exists" });
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
