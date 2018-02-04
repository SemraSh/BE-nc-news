const app = require('express')();
const apiRouter = require('./routes/apiRouter')

app.use('/' ,apiRouter)

module.exports = app;