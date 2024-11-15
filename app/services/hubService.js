const PoweredUP = require('node-poweredup');
const poweredUP = new PoweredUP.PoweredUP();

let hub;

async function connectToHub() {
    return new Promise((resolve, reject) => {
        poweredUP.on("discover", async (discoveredHub) => {
            hub = discoveredHub;
            console.log("Hub connecting");
            // console.log(hub);
            try {
                await hub.connect();
                console.log("Hub connected");
                resolve();
            } catch (error) {
                reject("Connection to hub failed");
            }
        });
        poweredUP.scan();
    });
}

async function disconnectHub() {
    if (hub && hub.connected) {
        await hub.disconnect();
        console.log("Hub disconnected");
    } else {
        throw new Error("Hub is not connected");
    }
}

async function batteryLevel() {
    if (hub && hub.connected) {
        return await hub.batteryLevel;
    } else {
        throw new Error("Cannot get battery level. Hub is not connected");
    }
}

async function name() {
    if (hub && hub.connected) {
        return await hub.name;
    } else {
        throw new Error("Cannot get battery level. Hub is not connected");
    }
}

async function primaryMACAddress() {
    if (hub && hub.connected) {
        return hub.primaryMACAddress;
    } else {
        throw new Error("Cannot get battery level. Hub is not connected");
    }
}

async function uuid() {
    if (hub && hub.connected) {
        return hub.uuid;
    } else {
        throw new Error("Cannot get battery level. Hub is not connected");
    }
}

async function getDevices() {
    if (hub && hub.connected) {
        return await hub.getDevices();
    } else {
        throw new Error("Cannot get battery level. Hub is not connected");
    }
}

function getHub() {
    if (!hub || !hub.connected) {
        throw new Error("Hub is not connected");
    }
    return hub;
}

module.exports = { connectToHub, disconnectHub, getHub, batteryLevel, name, getDevices, primaryMACAddress, uuid };
