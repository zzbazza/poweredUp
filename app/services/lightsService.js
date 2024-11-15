const hubService = require('./hubService');

async function setBrightness(brightness, port = "A") {
    let hub = hubService.getHub();
    console.log(`Turning on lights with intensity ${brightness}`);
    const lights = await hub.waitForDeviceAtPort(port);
    await lights.setBrightness(brightness);
    console.log(`Lights turned on.`);
}

async function rampBrightness(fromBrightness, toBrightness, time, port = "A") {
    let hub = hubService.getHub();
    console.log(`Turning on lights with intensity from ${fromBrightness} to ${toBrightness} over ${time} ms`);
    const lights = await hub.waitForDeviceAtPort(port);
    await lights.rampBrightness(fromBrightness, toBrightness, time);
    console.log(`Lights turned on.`);
}

module.exports = { setBrightness, rampBrightness };
