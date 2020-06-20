var fs = require('fs');
var os = require('os');
var Job = require('./../models/Job');
var socket = require('./../socket').io();
var code_message = require('./../models/code_message');
const path = require('path');
var port = require('./../app.js');
var moment = require('moment');
var SimpleLinearRegression = require('ml-regression-simple-linear');
var documentoPDF = require('pdfkit');

var bufferReader = '';
var ensayo = null;
var file;
var contador_apertura_cierre = 0;
var bool_media_apertura_cierre = false;
var maxandmin_values = [0, 100000, 0, 100000, 0, 100000]; 
var curvas = ["", "", ""];
var areas_values = [0, 0, 0];

var last_value = {
    time: moment(new Date()).format("hh:mm:ss"),
    celda:0,
    celdaSet:0,
    celda_max:0,
    celda_min:0,
    celda_area:0,
    lvdt0:0,
    lvdt0Set:0,
    lvdt0_max:0,
    lvdt0_min:0,
    lvdt0_area:0,
    lvdt1:0,
    lvdt1Set:0,
    lvdt1_max:0,
    lvdt1_min:0,
    lvdt1_area:0,
    apertura_y_cierre:0,
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
    let scb = false;
    let max_min_values = [0, 100000, 0, 100000, 0, 100000];
    let areas = [0, 0, 0];

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
            scb = true;
        }
     } else if(index>2){   
           let lineArray = line.split('|',4);  
           if(lineArray[0] != 'DATOS/INST'){
               if(lineArray[0] == 'MAX_VALOR'){
                   max_min_values[0] = lineArray[1];
                   max_min_values[2] = lineArray[2];
                   max_min_values[4] = lineArray[3];
                } else if(lineArray[0] == 'MIN_VALOR'){
                    max_min_values[1] = lineArray[1];
                    max_min_values[3] = lineArray[2];
                    max_min_values[5] = lineArray[3];
                } else {
                    if(ayp){
                        if(lineArray[0] != 'APYCIERRE'){
                            celda.push(+lineArray[0]);
                            lvdt0.push(+lineArray[1]);
                            lvdt1.push(+lineArray[2]);
                            time.push(lineArray[3]);
                        } else {
                            apertura_y_cierre = lineArray[3];
                    }
                } else if(scb){
                    if(lineArray[0] != 'AREA'){
                        celda.push(+lineArray[0]);
                        lvdt0.push(+lineArray[1]);
                        lvdt1.push(+lineArray[2]);
                        time.push(lineArray[3]);
                    } else {
                        areas[0] = lineArray[1];
                        areas[1] = lineArray[2];
                        areas[2] = lineArray[3];
                    }
                } else {
                    celda.push(+lineArray[0]);
                    lvdt0.push(+lineArray[1]);
                    lvdt1.push(+lineArray[2]);
                    time.push(lineArray[3]);
                }
                }
            }
        }});

    const json = {
       header : header,
       values : {
           celdas : celda , 
           celda_max : max_min_values[0] ,
           celda_min : max_min_values[1] ,
           celda_area: areas[0] ,
           lvdt0 : lvdt0 ,
           lvdt0_max : max_min_values[2],
           lvdt0_min : max_min_values[3],
           lvdt0_area: areas[1] ,
           lvdt1 : lvdt1 , 
           lvdt1_max : max_min_values[4],
           lvdt1_min : max_min_values[5],
           lvdt1_area: areas[2] ,
           time : time
       },
       apycierre: apertura_y_cierre,     
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
         if(ensayo.tipoEnsayo == 'SEMI_PROBETA'){
            let x = [];
            let celda_y = [];
            let lvdt0_y = [];
            let lvdt1_y = [];
            let curva;
            for(let i = 0; i < ensayo.values.length; i++){
                let value = (i+1)*10;
                x.push(value);
                celda_y.push(ensayo.values[i].celda);
                lvdt0_y.push(ensayo.values[i].lvdt0);
                lvdt1_y.push(ensayo.values[i].lvdt1);
            }
            curva = new SimpleLinearRegression(x, celda_y); 
            curvas[0] = curva.slope+"*x"+curva.intercept;
            curva = new SimpleLinearRegression(x, lvdt0_y); 
            curvas[1] = curva.slope+"*x"+curva.intercept;
            curva = new SimpleLinearRegression(x, lvdt1_y); 
            curvas[2] = curva.slope+"*x"+curva.intercept;
            //llamado a funcion de calculo de integral definida
            last_value.celda_area = areas_values[0];
            last_value.lvdt0_area = areas_values[1];
            last_value.lvdt1_area = areas_values[2];
            }
         socket.emit('arduino:graph_value', last_value);
    },10000);
    
    ensayo.registrando = true;
    res.send({ message: "Registrando Valores" });
}

exports.jobs_stop = function (req, res) {
    let data_line = `DATOS/INST|CELDA|LVDT0|LVDT1${os.EOL}`;
    let maxvalues_line = `MAX_VALOR|${maxandmin_values[0]}|${maxandmin_values[2]}|${maxandmin_values[4]}${os.EOL}`;
    let minvalues_line = `MIN_VALOR|${maxandmin_values[1]}|${maxandmin_values[3]}|${maxandmin_values[5]}${os.EOL}`;   
    fs.writeSync(file, data_line);
    fs.writeSync(file, maxvalues_line);
    fs.writeSync(file, minvalues_line);
    if(ensayo.tipoEnsayo == 'APERTURA_Y_CIERRE'){
        let openclose_line = `APYCIERRE|=|=|${contador_apertura_cierre}${os.EOL}`
        fs.writeSync(file, openclose_line);
    } else if(ensayo.tipoEnsayo == 'SEMI_PROBETA'){
        let areavalues_line = `AREA|${areas_values[0]}|${areas_values[1]}|${areas_values[2]}${os.EOL}`;
        fs.writeSync(file, areavalues_line); 
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
            //Para no almacenar siempre todos los datos en el primer registro vamos almacenar los datos del trabajo
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
        maxandmin_values = [0, 100000, 0, 100000, 0, 100000];  
        areas_values = [0, 0, 0];
        curvas = ["", "", ""];
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
                if(last_value.celda > maxandmin_values[0]){
                    maxandmin_values[0] = last_value.celda;
                }
                if(last_value.celda < maxandmin_values[1]){
                    maxandmin_values[1] = last_value.celda;
                }
                if(last_value.lvdt0 > maxandmin_values[2]){
                    maxandmin_values[2] = last_value.lvdt0;
                }
                if(last_value.lvdt0 < maxandmin_values[3]){
                    maxandmin_values[3] = last_value.lvdt0;
                }
                if(last_value.lvdt1 > maxandmin_values[4]){
                    maxandmin_values[4] = last_value.lvdt1;
                }
                if(last_value.lvdt1 < maxandmin_values[5]){
                    maxandmin_values[5] = last_value.lvdt1;
                }
                last_value.celda_max = maxandmin_values[0];
                last_value.celda_min = maxandmin_values[1];
                last_value.lvdt0_max = maxandmin_values[2];
                last_value.lvdt0_min = maxandmin_values[3];
                last_value.lvdt1_max = maxandmin_values[4];
                last_value.lvdt1_min = maxandmin_values[5];
                if(ensayo.tipoEnsayo == 'APERTURA_Y_CIERRE'){
                    if(values.lvdt0 >= 0.4){
                        bool_media_apertura_cierre = true;
                    }

                    if((values.lvdt0 <= -2.3)&&(bool_media_apertura_cierre)){
                        contador_apertura_cierre = contador_apertura_cierre + 1;
                        bool_media_apertura_cierre = false;
                    }
                }
                last_value.apertura_y_cierre = contador_apertura_cierre;
                last_value.celda_area = areas_values[0];
                last_value.lvdt0_area = areas_values[1];
                last_value.lvdt1_area = areas_values[2];

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
            res.send(JSON.stringify({ message: "File removed" }));
        } else {
            res.status(500).send(JSON.stringify({ message: "File not exists" }));
        }
    });
}

exports.downloadFile = (req, res) => {

    var file = req.params.file;
    var fileLocation = path.join('./ensayos', file);
    console.log(fileLocation);
    fs.exists(fileLocation, (exists) => {
        if (exists) {
            console.log('File exists. Downloading now ...');
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
