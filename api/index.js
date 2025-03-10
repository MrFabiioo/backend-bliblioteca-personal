require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {errorHandler,logErros,boomErrorHandler} = require('./middlewares/error.hadlers');
const routerApi = require('./routes')
const app = express();
const port = process.env.PORT;

app.use(express.json());


const whitelist = ['http://localhost:3000', 'https://myapp.co','http://localhost:5173'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('un Dominio no permitido esta intentando acceder al API'));
    }
  }
}
app.use(cors(options));

app.get('/api/prueba', (req, res) => {
  res.send('Servidor express DE PRUEBA ACTIVO');
});


routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Puerto ' +  port + ' Funcionando');
});