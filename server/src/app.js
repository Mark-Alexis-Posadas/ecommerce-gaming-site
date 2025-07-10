const express = require('express');
const cors = require('cors');
const routes = require('./routes/index.route');
// const errorHandler = require('./middleware/errorHandler');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api', routes);

//error handling
// app.use(errorHandler);

module.exports = app;