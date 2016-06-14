'use strict';
var ApplicationController = function(JwtAuth, $state) {
     /**
     * Returns true if the user is authenticated and false if its not.
     *
     * @returns {false|true|boolean}
     */
    this.isAuthenticated = function() {
        return JwtAuth.isAuthenticated();
    };

    /**
     * Logs out
     */
    this.logout = function() {
        JwtAuth.logout();
        $state.go('Login');
    }
};

ApplicationController.$inject = ['JwtAuth', '$state'];
angular.module('sampleApp').controller('ApplicationController', ApplicationController);

module.exports = ApplicationController;
