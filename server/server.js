'use strict';

const http = require('http');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const logErrors = require('./error-handler/log-errors');
const clientErrorHandler = require('./error-handler/client-error-handler');
const errorHandler = require('./error-handler/error-handler');

let app = express();
let router = express.Router();
let server = http.createServer(app);

app.use(express.static('./dist'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use('/', router);
require('./model/model.route')(router);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

server.listen(process.env.PORT || 3000);

module.exports = server;