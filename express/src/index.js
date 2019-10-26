#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app'
import http from 'http'
import Socket from './libs/Socket'
import Amqp from './libs/Amqp'

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const amqpIns = new Amqp()
const socketIns = new Socket(server)
socketIns.invokeSockets(amqpIns)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    console.log('error happens in line of 64')
    console.error(error)
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      console.log('error happens in line of 83')
      console.error(error)
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  console.log(`Listening on port ${addr.port}`)
}
