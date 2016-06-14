'use strict';
const Hapi                        = require('hapi');
const ApplicationController       = require('./controllers/ApplicationController');
const AuthController              = require('./controllers/api/AuthController');

class Routes {
    constructor(server) {
        this.server = server;
        this.init();
    }

    /**
     * Initializes all the routes
     */
    init() {
        this.initDirectories();
        this.initApiRoutes();
        this.initStaticRoutes();
    };

    /**
     * Initializes the directories to be freely served. These directories might contain files like photos or css...
     */
    initDirectories() {
        var routes = [];
        routes.push(this.getDirectoryRouteConfig('/css/{path*}',      './public/css',     false));
        routes.push(this.getDirectoryRouteConfig('/js/{path*}',       './public/js',      false));
        routes.push(this.getDirectoryRouteConfig('/partials/{path*}', './public/partials', false));

        this.server.route(routes);
    }

    /**
     * Initializes routes to be handled by the single page frontend application
     */
    initStaticRoutes() {
        var routes = [
            /** Application routes **/
            { method: 'GET',  path: '/',                                   config: { auth: false }, handler: ApplicationController.getIndexView },
            { method: 'GET',  path: '/login',                              config: { auth: false }, handler: ApplicationController.getIndexView },
        ];

        this.server.route(routes);
    }

    /**
     * Initialize API routes
     */
    initApiRoutes() {
        let prefix = '/api/v1';

        let routes = [
            /** Auth routes **/
            { method: 'POST', path: prefix + '/register',                           config: { auth: false }, handler: AuthController.register },
            { method: 'POST', path: prefix + '/login',                              config: { auth: false }, handler: AuthController.login },
        ];

        this.server.route(routes);
    }

    /**
     * Gets the route configuration object for a directory that contains files and subdirectories to be served
     *
     * @param urlPath
     * @param staticPath
     * @returns {{method: string, path: string, handler: {directory: {path: string, listing: boolean}}}}
     */
    getDirectoryRouteConfig(urlPath, staticPath, requiresAuth) {
        return {
            method: 'GET',
            path: urlPath,
            config: {
                auth: requiresAuth
            },
            handler: {
                directory: {
                    path: staticPath,
                    listing: false
                }
            }
        };
    }
}

module.exports = (server) => {
    return new Routes(server);
};
