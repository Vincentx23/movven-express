const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//Settings 
app.set('port', process.env.PORT || 80)


//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


//Routes
app.use('/api', require('./routes'));

module.exports = app
