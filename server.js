const app = require('express')();
const apiRouter = require('./routes/apiRouter')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const {DB_URL} = process.env

mongoose.connect(DB_URL)

app.use(bodyParser.json())
app.use('/' ,apiRouter)

module.exports = app;