if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const app = require('express')();
const router = require('./routes/router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config').DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;

mongoose.connect(db);

app.use(bodyParser.json());
app.use('/', router);
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({ error: { code: err.status, message: err.message } });
	next();
});

module.exports = app;