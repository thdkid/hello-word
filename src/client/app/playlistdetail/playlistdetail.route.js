(function() {
  'use strict';

  angular
    .module('app.playlistdetail')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'playlistDetail',
        config: {
          url: '/PlaylistDetail/:id',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@playlistDetail': {
              templateUrl: 'app/playlistdetail/playlistdetail.html',
              controller: 'PlaylistDetailController',
              controllerAs: 'vm'
            }
          },
          title: 'PlaylistDetail',
          authenticate: true
        }
      }
    ];
  }
})();
