const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const path = require('path');

const app = express();

let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3001;

app.use(express.static(publicPath));

// IO esta es la comunicación del back-end
module.exports.io = socketIO(server);
require('./socket/socket.js')

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});