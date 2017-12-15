(function() {
  'use strict';

  angular
    .module('app.home')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'callback',
        config: {
          url: '/callback',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@callback': {
              templateUrl: 'app/callback/callback.html',
              controller: 'CallBackController',
              controllerAs: 'vm',
            }
          },
          title: 'Callback',
        }
      }
    ];
  }
})();
