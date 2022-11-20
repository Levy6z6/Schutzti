const express = require('express');

const app = express();

app.set('port', process.env.PORT || 5001);

const config = express.json({type:'*/*'});

module.exports = app;
module.exports = config;