const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger');
const router = require('./route');

// initialize swagger-jsdoc
const swaggerDefinition = {
  info: {
    title: 'Crypto exchange API',
    version: '1.0.0',
    description: '<p>Crypto exchange REST API Framework</p>'
  },
  produces: ['application/json'],
  consumes: ['application/json'],
  schemes: ['http', 'https'],
  basePath: '/'
};

// options for the swagger docs
var swaggerJsDocOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./src/route/**/*.js']
};
var swaggerSpec = swaggerJsDoc(swaggerJsDocOptions);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const server = express();

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/crypto', router);
server.use(cors());

server.get('/', (req, res) => {
  res.send('Hello World V1.1.0');
});

server.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);
