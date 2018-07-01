var express = require('express');
var router = express.Router();

// Require controller modules.
var jobsController = require('./../controllers/jobsController.js')
var settingController = require('./../controllers/settingsController.js')


/* Los endpoints que vamos a manejar para crear o solicitar datos desde el cliente */
router.get('/jobs', jobsController.jobs_get);
router.delete('/job/:file', jobsController.removeFileJob);
router.get('/job/download/:file', jobsController.downloadFile);
router.get('/job', jobsController.job_get);
router.post('/job', jobsController.job_post);
router.get('/job/:fileJob', jobsController.jobs_get_values);
router.post('/job/start', jobsController.jobs_start);
router.post('/job/stop', jobsController.jobs_stop);
//-----------------------------------------------------------------------------------

router.get('/init/settings', settingController.initSerial);
router.get('/close/settings', settingController.closeSerial);

router.get('/settings', settingController.settings_get);
router.post('/settings', settingController.settings_post);

//Sin implementar
router.post('/settings/tare', settingController.settings_post_tare);
router.post('/settings/set_scale', settingController.settings_post_scale);

module.exports = router


/*
    En arduino para encontrar las constantes de las celdas de carga tenemos que ir pasandole valores
    de multiplicador, la cuestion viene cuando esos valores con mas grandes de 2¹⁶ que supera la cantidad maxima
    permitida por un Int por eso propongo que armemos una estructura nueva de Settings

|ARDUINO| Configuracion

   Este Objeto deberia estar prefijado y nosotros al arduino solo le tendriamos que mandar
   un mensaje en JSON para decirle que valor setear que dispositivo esta conectado al momento de hacer el ensayo
   de esta manera queda configurado arduino con los valores que necesitamos en ese ensayo. Como cada ensayo va ser
   independiente no es necesario conservar que seteo anterior se hizo.
   
   {                                                       
       celda:[
        { celda:500  //kg, multiplicador: A },
            { celda:1000 //kg, multiplicador: B },
            { celda:2000 //kg, multiplicador: C }
        ],
        lvdt: [
            { lvdt: 10 //mm, multiplicador: A}
            { lvdt: 20 //mm, multiplicador: B}
            { lvdt: 25 //mm, multiplicador: C}
        ]
    }

    Esta estructura la coloco en json por que es mas facil para verlo. Pero tenemos que modificar la clase "Setting"
    que esta en arduino para que podamos guardar estos valores en la EPROM. Reitero crear una clase que nos permita
    reflejar la  estructura anterior.

  Comunicacion |NodeJS| --> |Arduino|

    EN ARDUINO: Vamos a modificar lo que ya existe para cumplir con lo siguiente.

    Desde NodeJs se le van a enviar los siguientes mensajes de control a arduino. RECORDAR los valores de las celdas y
    lvdts van a estar prefijados de ante mano. Solamente vamos a setear cual usar en cada momento.
    
        Para LVDTs (M.1)
        {
            estado: 200,
            lvdt0: { lvdt: <10|20|25>, selected: true},
            lvdt1: { lvdt: <10|20|25>, selected: false}
        }

        Para CELDA (M.2)

        {
            estado: 300,
            celda: <500|1000|2000>
        }

        Para la TARA vamos a enviar    (M.2.1)
        
        {
            estado: 301
            
        }

        Para TIEMPO_MUESTREO (M.3)

        {
            estado: 400,
            celda: <10|60|600|900|1800|3600>
        }      

      
    Arduino estara emitiendonos  mensajes con la siguiente estructura

        |Arduino| --> |NodeJs|

    M.4 {
        celda: <valor>
        lvdt0: <valor>
        lvdt1: <valor>
    }

    Mensaje de Error M.5
     
    {
        estado: 500
        error: <Texto>
    }

    Vamos a tener que crear los siguientes endpoints en nodejs para poder comunicarnos con el arduino

    Archivos que se tiene que modificar
(routes.js) hay que crear los siguientes endpoint

    /settings/celda --> Method POST 

        Este endpoint nos permite seleccionar la configuracion de la celda conectada al equipo

        (Cliente) --MC.1 -->  |NodeJs| --M.2--> |Arduino|

        MC.1 --> {
            celda: <500|1000|2000>
        }

    /settings/tare --> Method POST

        Este endpoint nos permite realizar la TARA

         (Cliente) --MC.1 -->  |NodeJs| --M.2.1--> |Arduino|

        MC.1 --> {
            estado:301
        }

    /setting/lvdts  --> Method POST

        Este endpoint permite setear la configuracion de los LDVTS para el ensayo

                 (Cliente) --MC.1 -->  |NodeJs| --M.1--> |Arduino|

        MC.1 --> {
            lvdt0: { lvdt: <10|20|25>, selected: true|false},
            lvdt1: { lvdt: <10|20|25>, selected: true|false}
        }


    /settings/open --> Method GET

        Este endpoint nos permitira abrir el puerto serie

         (Cliente) ---->  |NodeJs|

    /settings/close --> Method GET

        Este endpoint nos permitira cerrar el puerto serie

        (Cliente) ---->  |NodeJs|

        (settingsController) hay que modificar o crear los controladores para los endpoints anteriores

SECUENCIA DE CONFIGURACION 

        Primero antes de empezar con el seteo de los dispositivos tenemos que ABRIR LA CONEXION SERIE (/settings/open)
        para luego poder enviar cualquiera de los mensajes estimados

        una vez concluido el seteo debemos volver a cerrar la comunicacion SERIE (/settings/close)

*/