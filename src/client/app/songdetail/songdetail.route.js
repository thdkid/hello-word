(function() {
  'use strict';

  angular
    .module('app.songdetail')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'songDetail',
        config: {
          url: '/Songs/:songID',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@songDetail': {
              templateUrl: 'app/songdetail/songdetail.html',
              controller: 'SongDetailController',
              controllerAs: 'vm'
            }
          },
          title: 'Songs',
        }
      }
    ];
  }
})();
