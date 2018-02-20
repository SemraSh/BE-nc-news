const PORT = require('./config').PORT[process.env.NODE_ENV] || process.env.PORT;
const app = require('./server');

app.listen(PORT, () => console.log(`listening on port ${PORT}`));