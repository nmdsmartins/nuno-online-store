const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerJsDocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopping Cart',
      version: '1.0.0',
      description: 'This service handles the shopping cart actions of users'
    }
  },
  apis: ['./src/api/*.js']
};
const apiSpec = swaggerJsDoc(swaggerJsDocOptions);

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/swagger.json', (_req, res) => res.json(apiSpec));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(null, { swaggerOptions: { url: '/swagger.json' } }));
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
