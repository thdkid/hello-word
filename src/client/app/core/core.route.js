(function() {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  /* @ngInject */
  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [
      {
        state: '404',
        config: {
          url: '/404',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@404': {
              templateUrl: 'app/core/404.html',
            }
          },
          title: '404'
        }
      }
    ];
  }
})();
