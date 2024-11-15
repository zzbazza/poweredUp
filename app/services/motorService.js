const hubService = require('./hubService');

async function startMotor(speed = 50, port = "A") {
    const hub = hubService.getHub();
    console.log(`Starting motor at speed ${speed}`);
    const motor = await hub.waitForDeviceAtPort(port);
    await motor.setPower(speed);
    console.log(`Motor started at speed ${speed}`);
}

async function stopMotor(port = "A") {
    const hub = hubService.getHub();
    console.log("Stopping motor");
    const motor = await hub.waitForDeviceAtPort(port);
    await motor.brake();
    console.log("Motor stopped");
}

module.exports = { startMotor, stopMotor };
