require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler, logErros, boomErrorHandler } = require('./middlewares/error.hadlers');
const routerApi = require('./routes');

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

// Elimina rutas separadas y usa solo routerApi
routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

// ❌ No usar app.listen() en Vercel  
// ✔️ Exportar como una función manejadora  
module.exports = app;
