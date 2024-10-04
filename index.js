const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

console.log(port)

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.listen(port, () => {
  console.log('Mi port' +  port);
});
