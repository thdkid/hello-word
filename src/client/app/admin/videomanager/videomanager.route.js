(function() {
  'use strict';

  angular
    .module('app.admin.video')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'adminvideo',
        config: {
          url: '/Admin/Videos',
          views: {
              'main': {
                templateUrl: 'app/admin/layout.html'
              },
              'content@adminvideo': {
                templateUrl: 'app/admin/videomanager/videomanager.html',
                controller: 'AdminVideoController',
                controllerAs: 'vm',
              }
            },
          title: 'Admin Video'
        }
      }
    ];
  }
})();
