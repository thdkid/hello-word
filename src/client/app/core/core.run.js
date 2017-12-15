(function () {

  'use strict';

  angular
    .module('app.core')
    .run(run);

  run.$inject = ['$rootScope', '$state', 'authService','dataservice'];

  function run($rootScope, $state, authService,dataservice) {
    // var user = dataservice.getUserDetail(sessionStorage.getItem('id'));
    // Handle the authentication
    // result in the hash
    authService.handleAuthentication();
    //-------------------------------------
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !authService.isAuthenticated()) {
        // User isn’t authenticated
        alert('Bạn chưa đăng nhập!!!'); // jshint ignore:line
        $state.transitionTo('home');
        event.preventDefault();
      }
      if (toState.admin && !sessionStorage.getItem('auth')) {
        // User isn’t authenticated
        alert('Bạn không có quyền truy cập!!!'); // jshint ignore:line
        $state.transitionTo('home');
        event.preventDefault();
      }
    });
  }

})();
