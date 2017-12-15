(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[MusicWebsite Error] ',
    appTitle: 'JaMusic'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
  }

  core.config(authConfig);
  authConfig.$inject = ['$locationProvider','$urlRouterProvider','angularAuth0Provider'];
  /* @ngInject */
  function authConfig($locationProvider,$urlRouterProvider,angularAuth0Provider) {
    angularAuth0Provider.init({
      clientID: 'tjQy6nohyR3y6eBbreTlyvgBhyBKNIzh',
      domain: 'rouclone.auth0.com',
      responseType: 'token id_token',
      audience: 'https://rouclone.auth0.com/userinfo',
      redirectUri: 'http://localhost:3000/callback',
      scope: 'openid profile'
    });
  }

  core.config(sessionIdle);
  sessionIdle.$inject = ['KeepaliveProvider', 'IdleProvider'];
  /* @ngInject */
  function sessionIdle(KeepaliveProvider, IdleProvider) {
    IdleProvider.idle(50);
    IdleProvider.timeout(5);
    KeepaliveProvider.interval(55);
  }
})();
