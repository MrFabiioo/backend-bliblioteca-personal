require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const {errorHandler,logErros,boomErrorHandler} = require('./middlewares/error.hadlers');
const routerApi = require('./routes')
const app = express();
const port = process.env.PORT;

app.use(express.json());

const jwtCheck = auth({
  audience:process.env.AUTH0_AUDIENCE,
  issuerBaseURL:process.env.AUTH0_ISSUER_BASE_URL,
  //tokenSigningAlg: "RS256",
})
const checkScopes = requiredScopes(['read:endpoints']);

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

app.get('/prueba', (req, res) => {
  res.send('Servidor express DE PRUEBA ACTIVO');
 // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// app.get('/', (req, res) => {
//   //res.send('Servidor express ACTIVO');
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/profile',  (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });


routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Puerto ' +  port + ' Funcionando');
});