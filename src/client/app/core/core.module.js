(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngSanitize','ui.select',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router','ngplus', 'auth0.auth0', 'ngIdle', 'ngFileUpload'
    ]);
})();
