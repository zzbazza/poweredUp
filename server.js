const express = require('express');
const hubRoutes = require('./app/routes/hubRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static('public'));

// Use the routes defined in hubRoutes.js
app.use('/api/hub', hubRoutes);

app.use('/blockly', express.static(path.join(__dirname, 'node_modules', 'blockly')));

app.post('/api/execute', async (req, res) => {
    try {
        const code = req.body.code;
        console.log(code);

        const asyncFunction = new Function('require', `
          const motorService = require('./app/services/motorService');
          return (async () => { ${code} })();
        `);
        await asyncFunction(require);

        res.status(200).json({ message: 'Code executed successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error executing code' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
