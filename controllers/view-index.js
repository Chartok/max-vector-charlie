const express = require('express');

const hbRouter = require('./hb-routes');
const mainRoutes = require('./main-routes');

const app = express();

app.use('/', mainRoutes);
app.use('/view', hbRouter);

module.exports = app;