require('dotenv').config();
const express = require('express');
const {errorHandler,logErros,boomErrorHandler} = require('./middlewares/error.handler');
const routerApi = require('./routes')
const app = express();
const port = process.env.PORT;

//console.log(port)

app.get('/', (req, res) => {
  res.send('Servidor express ACTIVO');
});




routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Puerto ' +  port + ' Funcionando');
});