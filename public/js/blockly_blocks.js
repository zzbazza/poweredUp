Blockly.Blocks['motor_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Start motor at speed")
            .appendField(new Blockly.FieldNumber(25, -100, 100), "SPEED");
        this.appendDummyInput()
            .appendField("Port")
            .appendField(new Blockly.FieldTextInput("A"), "PORT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Start motor at a specified speed");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['motor_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Stop motor");
        this.appendDummyInput()
            .appendField("Port")
            .appendField(new Blockly.FieldTextInput("A"), "PORT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Stop motor");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['controls_wait'] = {
    init: function() {
        this.appendValueInput("DURATION")
            .setCheck("Number")
            .appendField("wait for");
        this.appendDummyInput()
            .appendField("seconds");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Wait for a specified amount of milliseconds");
    }
};

Blockly.Blocks['slider_value'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get slider value");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Returns value from slider");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['slider_value'] = function(block) {
    const code = `motorService.setSpeed(document.getElementById('motorSpeedSlider').value);\n`;
    return code;
};

Blockly.JavaScript.forBlock['motor_start'] = function (block) {
    const speed = block.getFieldValue('SPEED');
    const port = block.getFieldValue('PORT');
    return `await motorService.startMotor(${speed}, "${port}");\n`;
};

Blockly.JavaScript.forBlock['motor_stop'] = function (block) {
    const port = block.getFieldValue('PORT');
    return `await motorService.stopMotor("${port}"  );\n`;
};

Blockly.JavaScript.forBlock['controls_wait'] = function(block) {
    const duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC) || '1000';
    return `await new Promise(resolve => setTimeout(resolve, ${duration * 1000}));\n`;
};
