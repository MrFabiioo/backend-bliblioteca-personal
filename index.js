require('dotenv').config();
const express = require('express');
const routerApi = require('./routes')
const app = express();
const port = process.env.PORT;

//console.log(port)

app.get('/', (req, res) => {
  res.send('Servidor express ACTIVO');
});


app.listen(port, () => {
  console.log('Puerto ' +  port + ' Funcionando');
});

routerApi(app);

