(function() {
  'use strict';

  angular
    .module('app.playlist')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'playlist',
        config: {
          url: '/Playlist/:userID',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@playlist': {
              templateUrl: 'app/playlist/playlist.html',
              controller: 'PlaylistController',
              controllerAs: 'vm'
            }
          },
          title: 'Playlist',
          authenticate: true
        }
      }
    ];
  }
})();
