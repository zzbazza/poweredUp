// controllers/hubController.js
const hubService = require('../services/hubService');

async function connectHub(req, res) {
    try {
        console.log('Connecting')
        await hubService.connectToHub();
        console.log('Connected')
        const batteryLevel = await hubService.batteryLevel();
        const name = await hubService.name();
        const primaryMACAddress = await hubService.primaryMACAddress();
        const uuid = await hubService.uuid();
        const devices = (await hubService.getDevices()).map(device => device.name);
        res.status(200).json({
            message: "Hub connected successfully",
            info: {
                batteryLevel,
                name,
                devices,
                primaryMACAddress,
                uuid
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to connect to hub" });
    }
}

async function disconnectHub(req, res) {
    try {
        await hubService.disconnectHub();
        res.status(200).json({ message: "Hub disconnected successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to disconnect from hub" });
    }
}

async function getBatteryLevel(req, res) {
    try {
        const batteryLevel = await hubService.batteryLevel();
        res.status(200).json({ batteryLevel });
    } catch (error) {
        res.status(500).json({ error: "Failed to get battery level" });
    }
}

async function getName(req, res) {
    try {
        const name = await hubService.name();
        res.status(200).json({ name });
    } catch (error) {
        res.status(500).json({ error: "Failed to get name" });
    }
}

async function getDevices(req, res) {
    try {
        const devices = await hubService.getDevices();
        res.status(200).json({ devices });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get devices" });
    }
}

module.exports = { connectHub, disconnectHub, getBatteryLevel, getName, getDevices };
