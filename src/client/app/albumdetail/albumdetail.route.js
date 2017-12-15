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
        state: 'albumDetail',
        config: {
          url: '/Albums/:albumID',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@albumDetail': {
              templateUrl: 'app/albumdetail/albumdetail.html',
              controller: 'AlbumDetailController',
              controllerAs: 'vm'
            }
          },
          title: 'Albums',
        }
      }
    ];
  }
})();
