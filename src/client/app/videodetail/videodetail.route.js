(function() {
  'use strict';

  angular
    .module('app.videodetail')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'videoDetail',
        config: {
          url: '/Videos/:videoID',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@videoDetail': {
              templateUrl: 'app/videodetail/videodetail.html',
              controller: 'VideoDetailController',
              controllerAs: 'vm'
            }
          },
          title: 'Videos',
        }
      }
    ];
  }
})();
