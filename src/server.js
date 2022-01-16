const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger');
const router = require('./route');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/crypto', router);
server.use(cors());

server.get('/', (req, res) => {
  res.send('Hello World V2');
});

server.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);
