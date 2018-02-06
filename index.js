require('dotenv').config()
const app = require('./server');
const {PORT} = process.env;
const mongoose = require('mongoose')
const {DB_URL} = process.env

mongoose.connect(DB_URL)
app.listen(PORT, () => console.log(`listening on port ${PORT}`));