// controllers/lightsController.js
const lightsService = require('../services/lightsService');

async function turnOnLights(req, res) {
    const { brightness, port } = req.body; // Color should be provided in the request body

    try {
        await lightsService.setBrightness(brightness, port);
        res.status(200).json({ message: `Lights turned on.}` });
    } catch (error) {
        res.status(500).json({ error: "Failed to turn on lights" });
    }
}

async function rampBrightness(req, res) {
    const { fromBrightness, toBrightness, time, port } = req.body; // Color should be provided in the request body

    try {
        await lightsService.rampBrightness(fromBrightness, toBrightness, time, port);
        res.status(200).json({ message: `Lights turned on.` });
    } catch (error) {
        res.status(500).json({ error: "Failed to turn on lights" });
    }
}

module.exports = { turnOnLights, rampBrightness };
