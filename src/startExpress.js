const Express = require('express');
const Debug = require('debug');
const Cors = require ('cors');

const debugExpress = Debug('app:express') //cmd >set DEBUG=app.express || app:*
const employeeRouter = require ('./router/employeeRouter.js');

function startExpress(config) {
  const port = process.env.PORT || config.port;
  const listenMsg = `Server listening port: ${port}`;

  const express = new Express();

  express.use(Express.json());
  express.use(Cors()); //for testing locally
  express.listen(port, debugExpress(listenMsg));
  express.get('/', sendReadMe());
  express.use('/api/employee/', employeeRouter);
}

function sendReadMe() {
  return (request, response) => {
    response.sendFile(__dirname + '/public/Readme.txt');
  };
}

module.exports = startExpress;