const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const exsession = require('express-session');

const path = require('path');
const coparser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();

//Settings 
app.set('port', process.env.PORT || 80)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(coparser());
app.use(express.json());
app.use(exsession
    ({
        secret: 'plastico',
        resave: false,
        saveUnitialazed: false,
        cookie: { secure: false }
    }));
app.use(flash());

//Static files 
app.use(express.static("public"), express.static(path.join(__dirname, "public")));

//Routes
app.use('/', require('./app/routes'));

module.exports = app
