'use strict';
var ApplicationController = function(JwtAuth, $state) {
    this.JwtAuth = JwtAuth;
    this.$state = $state;

    /**
     * Returns true if the user is authenticated and false if its not.
     *
     * @returns {false|true|boolean}
     */
    this.isAuthenticated = function() {
        return this.JwtAuth.isAuthenticated();
    };

    /**
     * Logs out
     */
    this.logout = function() {
        this.JwtAuth.logout();
        this.$state.go('Login');
    }
};

ApplicationController.$inject = ['JwtAuth', '$state'];
angular.module('sampleApp').controller('ApplicationController', ApplicationController);

module.exports = ApplicationController;
