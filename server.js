const app = require('express')();
const apiRouter = require('./routes/apiRouter')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/' ,apiRouter)

module.exports = app;