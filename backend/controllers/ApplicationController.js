'use strict';

class ApplicationController
{
    static getIndexView(request, reply) {
        reply.file('./public/index.html');
    }

    static getAdminIndex(request, reply) {
        reply.file('./public/admin.html');
    }
}

module.exports = ApplicationController;