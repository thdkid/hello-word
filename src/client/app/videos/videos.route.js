(function() {
  'use strict';

  angular
    .module('app.videos')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'videos',
        config: {
          url: '/Videos',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@videos': {
              templateUrl: 'app/videos/videos.html',
              controller: 'VideosController',
              controllerAs: 'vm',
            }
          },
          title: 'Videos',
          settings: {
            nav: 3,
            content: '<i class="fa fa-video-camera"></i>'
          }
        }
      }
    ];
  }
})();
