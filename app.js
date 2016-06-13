'use strict';
require('node-env-file')('./.env');
const Hapi = require('hapi');
const Inert = require('inert'); // Static file and directory handlers plugin
const SessionManager = require('./backend/helpers/SessionManager');

const server = new Hapi.Server();

server.connection({ port: 3000 });
server.register(Inert, () => {});
SessionManager.init(server);

const Routes = require('./backend/routes')(server);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
