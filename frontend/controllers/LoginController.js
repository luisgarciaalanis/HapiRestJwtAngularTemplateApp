'use strict';
var LoginController = function(JwtAuth, $state) {
    this.JwtAuth = JwtAuth;

    /**
     * Triggers login given a set of credentials
     *
     * @param creds
     */
    this.login = function(credentials) {
        this.JwtAuth.login(credentials).then(
            function() {
                console.log(JwtAuth.isAuthenticated());
                $state.go('Home', {});
            },
            function() {
                console.log('Unable to login');
            }
        );
    };
};

LoginController.$inject = ['JwtAuth', '$state'];
angular.module('sampleApp').controller('LoginController', LoginController);

module.exports = LoginController;
