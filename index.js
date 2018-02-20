const PORT = require('./config').PORT['dev'];
const app = require('./server');

app.listen(PORT, () => console.log(`listening on port ${PORT}`));