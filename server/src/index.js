const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
    res.send({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});