// index.js
const express = require('express');

const app = express();
app.use(express.json());


// import routes:
const prepRoutes = require('./modules/preprocessing/preprocessing.routes');
const stopWerseRoutes = require('./modules/stop-werse/stopwerse.routes');

// set routes:
app.use('/prep', prepRoutes);
app.use('/stop-werse', stopWerseRoutes);

app.listen(3000, () => {
    console.log(`Sunucu http://localhost:${3000} adresinde çalışıyor`);
});