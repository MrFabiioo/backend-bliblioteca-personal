require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler, logErros, boomErrorHandler } = require('./middlewares/error.hadlers');
const routerApi = require('./routes');
const serverless = require('serverless-http'); // Convierte Express en una función serverless

const app = express();

app.use(express.json());

const whitelist = ['http://localhost:3000', 'https://myapp.co', 'http://localhost:5173'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Un dominio no permitido está intentando acceder al API'));
    }
  }
};
app.use(cors(options));

// Definir rutas
routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/prueba',(req, res) => {
  res.send('Servidor express DE PRUEBA ACTIVO');
});

// ❌ No usar app.listen() en Vercel  
// ✔️ Exportar como una función manejadora para Serverless  

module.exports = serverless(app);
