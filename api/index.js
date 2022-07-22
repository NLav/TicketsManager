const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const routerUsers = require('./routes/users');
const routerTickets = require('./routes/tickets');
const routerTools = require('./routes/tools');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  app.use(cors);
  next();
});

app.use('/api/users', routerUsers);
app.use('/api/tickets', routerTickets);
app.use('/api/tools', routerTools);

app.listen(process.env.PORT || config.get('api.port'), () =>
  console.log('API rodando na porta ' + config.get('api.port'))
);
