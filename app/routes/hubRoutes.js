// routes/hubRoutes.js
const express = require('express');
const router = express.Router();
const motorController = require('../controllers/motorController');
const hubController = require('../controllers/hubController');
const lightsController = require('../controllers/lightsController');

router.post('/connect', hubController.connectHub);
router.post('/disconnect', hubController.disconnectHub);
router.get('/battery', hubController.getBatteryLevel);
router.get('/name', hubController.getName);
router.get('/devices', hubController.getDevices);

router.post('/motor/start', motorController.startMotor);
router.post('/motor/stop', motorController.stopMotor);

router.post('/lights/on', lightsController.turnOnLights);
router.post('/lights/change', lightsController.rampBrightness);

module.exports = router;
