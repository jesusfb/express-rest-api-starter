const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const pe = require('parse-error');
const cors = require('cors');
const CONFIG = require('./config/config');
const v1 = require('./routes/v1');
const docs = require('./docs');
const models = require("./models");

const app = express();

//Log Env
console.log("API Started Environment:", CONFIG.app);

app.use(logger(CONFIG.app));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Passport
app.use(passport.initialize());

//DATABASE
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
}).catch(err => {
    console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
});


if (CONFIG.app === 'dev') {
    // models.sequelize.sync();//creates table if they do not already exist
    // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}

// ROUTING
app.use(cors());
app.use('/v1', v1);
app.use('/docs', docs);

// 404 Error handler
app.use(function (req, res, next) {
    res.statusCode = 404;//send the appropriate status code
    res.json({status: "fail", message: "Not Found", data: {}})
});

// General Error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = CONFIG.app === 'dev' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// General Application Error
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

module.exports = app;
