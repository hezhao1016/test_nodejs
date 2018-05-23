const server = require('./server');
const route = require('./route');

server.start(route.home);