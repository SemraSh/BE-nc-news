const app = require('express')();
const apiRouter = require('./routes/apiRouter')
const bodyParser = require('body-parser')

console.log(process.env.NODE_ENV)
app.use(bodyParser.json())
app.use('/' ,apiRouter)

module.exports = app;