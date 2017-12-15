(function() {
  'use strict';

  angular
    .module('app.songs')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'songs',
        config: {
          url: '/Songs',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@songs': {
              templateUrl: 'app/songs/songs.html',
              controller: 'SongsController',
              controllerAs: 'vm',
            }
          },
          title: 'Songs',
          settings: {
            nav: 2,
            content: '<i class="fa fa-music"></i>'
          }
        }
      }
    ];
  }
})();
