require('dotenv').config()
const {PORT} = process.env;
const app = require('./server');

app.listen(PORT, () => console.log(`listening on port ${PORT}`));