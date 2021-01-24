const config = require('../config.development.json');
const startExpress = require('./startExpress');

//main entry point to the app
//cmd> npm start

startExpress(config);