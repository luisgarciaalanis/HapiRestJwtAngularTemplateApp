'use strict';
const Joi        = require('joi');

class BaseController
{
    /**
     * For placeholder routes
     *
     * @param request
     * @param reply
     */
    notImplemented(request, reply) {
        reply('Not implemented!');
    }

    /**
     * Joi validator helper
     *
     * @param payload
     * @param schema
     * @returns {*|promise}
     */
    validate(payload, schema) {
        return new Promise((resolve, reject) => {
            Joi.validate(payload, schema, (err, val) => {
                if (!err) {
                    resolve(val);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = BaseController;