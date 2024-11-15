const motorService = require('../services/motorService');

async function startMotor(req, res) {
    try {
        const { speed, port } = req.body;
        await motorService.startMotor(speed, port);
        res.status(200).json({ message: `Motor started at speed ${speed}` });
    } catch (error) {
        res.status(500).json({ error: "Failed to start motor" });
    }
}

async function stopMotor(req, res) {
    try {
        const { port } = req.body;
        await motorService.stopMotor(port);
        res.status(200).json({ message: "Motor stopped" });
    } catch (error) {
        res.status(500).json({ error: "Failed to stop motor" });
    }
}

module.exports = { startMotor, stopMotor };
