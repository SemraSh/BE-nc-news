require('dotenv').config();
const app = require('express')();
const router = require('./routes/router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let db;
if(process.env.NODE_ENV === 'test') db = process.env.DB_URL_TEST;
else db = process.env.DB_URL;

mongoose.connect(db);
app.use(bodyParser.json());
app.use('/', router);
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({error: {code: err.status, message: err.message}});
	next();
});

module.exports = app;