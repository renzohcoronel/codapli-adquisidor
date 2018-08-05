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


router.post('/settings/lvdts', settingController.settings_set_lvdts);
router.post('/settings/celda', settingController.settings_set_celda);
router.post('/settings/tara', settingController.settings_set_tara);
router.post('/settings/interval', settingController.settings_set_time_muestreo);


module.exports = router


