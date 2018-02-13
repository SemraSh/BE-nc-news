const app = require('express')();
const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let db;
if(process.env.NODE_ENV === 'test') db = process.env.DB_URL_TEST;
else db = process.env.DB_URL;

mongoose.connect(db);

app.use(bodyParser.json());
app.use('/', apiRouter);
app.use((err, req, res, next) => {
	if(err.name === 'CastError')
		res.status(404).send({error: err.message});
	if(err.name === 'ValidationError') 
		res.status(422).send({error: err.message});
});

module.exports = app;