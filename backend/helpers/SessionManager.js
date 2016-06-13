"use strict"
const JWT                    = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
const User                   = require('../models/User');
const bcrypt                 = require('bcrypt');

class SessionManager {
    constructor() {
        this.sessions = {};
    }

    /***
     * Initializes the session manager.
     *
     * Registers the jwt plugin and configures the auth strategy
     *
     * @param server
     */
    init(server) {
        server.register(require('hapi-auth-jwt2'), (err) => {
            if (err) {
                console.log(err);
                return;
            }

            server.auth.strategy('jwt', 'jwt',
                { key: process.env.JWT_SECRET, // Never Share your secret key
                    validateFunc: this.validate.bind(this), // validate function defined above
                    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
                });

            server.auth.default('jwt');
        });
    }

    /**
     * JWT Helpers
     */

    /***
     * Validates if the request is authentic
     *
     * @param decoded
     * @param request
     * @param callback
     */
    validate(decoded, request, callback) {
        if (this.sessions[decoded.id]) {
            callback(null, true);
        } else {
            User.findById(decoded.id).then(
                (user) => {
                    if (user) {
                        // this.newSession(decoded.id, request.auth.token)
                        callback(null, true);
                    } else {
                        callback(null, false);
                    }
                }
            );
        }
    }

    /**
     * Session Login code
     * Returns a promise that provides the authentication JWT
     *
     * @param email
     * @param password
     * @returns {*|promise}
     */
    login(email, password) {
        var deferred = q.defer();

        User.findByEmail(email).then(
            (result) => {
                let user = result.get({ plain:true });

                if (this.generatePasswordHash(password, user.salt) === user.password) {
                    let token = this.generateToken(user.id);
                    this.newSession(user.id, token);
                    deferred.resolve(token);
                } else {
                    deferred.reject();
                }
            }
        ).catch(() => {
            deferred.reject();
        });

        return deferred.promise;
    }

    /**
     * Creates a new session object with a given token
     * @param token
     * @returns {{token: *, data: {}}}
     */
    newSession(id, token) {
        this.sessions[id] = {
            token:token,
            data: {}
        };
    }

    /**
     * Removes the logged user from the session, invalidating its token for future validation.
     * @param id
     */
    logout(id) {
        if (this.sessions[id]) {
            delete this.sessions[id];
        }
    }

    /**
     * Generates a token for a user id, this function does not care if the id is of a valid user.
     *
     * @param id
     */
    generateToken(id) {
        let payload = {
            id: id
        };

        let token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });

        return token;
    }

    /**
     * Generates a new token for a user that is logged in
     * returns null if the user id is not from a logged user.
     *
     * @param userId
     * @returns { string , null}
     */
    generateTokenForUser(userId) {
        let userSession = this.sessions[userId];

        if (userSession) {
            userSession.token = this.generateToken(userId);
            return userSession.token;
        } else {
            return null;
        }
    }

    /**
     * Generates a password hash reinforced with a salt
     *
     * @param password
     */
    generatePasswordHash(password, salt) {
        let secret = process.env.PASSWORD_SECRET;

        return bcrypt.hashSync(password + secret, salt);
    }
}

module.exports = new SessionManager;

