'use strict';
const BaseController    = require('./BaseController');
const SessionManager    = require('../../helpers/SessionManager');
const Boom              = require('boom');

class AuthController extends BaseController
{
    constructor() {
        // need to call super for this pointer to be available
        super();
        this.fbTokens = {};
        this.fbUserIds = {};
        this.appAccessToken = null;
    }

    /**
     * Handles the login request, returning the JWT if successful
     *
     * @param request
     * @param reply
     */
    login(request, reply) {
        SessionManager.login(request.payload.email, request.payload.password).then(
            (token) => {
                reply({ token:token });
            },
            () => {
                reply(Boom.unauthorized());
            }
        );
    }

    /**
     * Logs user out of the session
     *
     * @param request
     * @param reply
     */
    logout(request, reply) {
        SessionManager.logout(request.auth.credentials.id);
        reply();
    }
    
    /**
     * Called to renew to JWT
     *
     * @param request
     * @param reply
     */
    renewToken(request, reply) {
        let token = SessionManager.generateTokenForUser(request.auth.credentials.id);
        if (token) {
            reply({ token:token });
        } else {
            reply(Boom.internal('Unable to renew token'));
        }
    }

    adminLogin(request, reply) {}
    register(request, reply) {}

    /**
     * Logs in with facebook and returns a JWT
     *
     * @param request
     * @param reply
     */
    facebookLogin(request, reply) {
        SessionManager.facebookLogin(request.payload.accessToken).then(
            (userInfo) => {
                reply(userInfo);
            }
        ).catch(
            () => {
                reply(Boom.forbidden());
            }
        );
    }
}

module.exports = new AuthController;