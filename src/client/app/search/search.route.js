(function() {
  'use strict';

  angular
    .module('app.search')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'search',
        config: {
          url: '/Search?keywords',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@search': {
              templateUrl: 'app/search/search.html',
              controller: 'SearchController',
              controllerAs: 'vm'
            }
          },
          title: 'Search',
        }
      }
    ];
  }
})();
