(function() {
  'use strict';

  angular
    .module('app.albums')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'albums',
        config: {
          url: '/Albums',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@albums': {
              templateUrl: 'app/albums/albums.html',
              controller: 'AlbumsController',
              controllerAs: 'vm',
            }
          },
          title: 'Albums',
          settings: {
            nav: 4,
            content: '<i class="fa fa-book"></i>'
          }
        }
      }
    ];
  }
})();
