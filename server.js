const { Console } = require('console');
const http = require('http');
const app = require('./app');

require('dotenv').config()

const port =  process.env.PORT || 3000;
console.log("Server is running at port: " + port)

const server = http.createServer(app);

server.listen(port);