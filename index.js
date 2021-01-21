const Express = require('express');
const Debug = require ('debug');
const namesRouter = require ( './routes/names.js')
const cors = require ( 'cors');
const Mongoose = require ('mongodb');

//cmd >set DEBUG=app.express || app:*
const debugExpress = Debug('app:express');

const port = process.env.PORT || 4000;
const message = `Listening port: ${port};`

const helloWorld = function (request, response) {
  response.send('Hello there!');
}

const express = new Express();

express.use(Express.json());
express.use(cors()); //for testing locally
express.listen(port, debugExpress(message));
express.get('/', helloWorld);
express.use('/api/names/', namesRouter);