const app = require('./server');
const PORT = require('./config').PORT[process.env.NODE_ENV] || process.env.PORT;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));