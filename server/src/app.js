require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');

const cors = require('cors');

const router = require('./routes');

const app = express();

app.set('port', process.env.SERVER_PORT || 3000);

app.use(cors());

app.use(express.json());

app.use(router);

module.exports = app;
