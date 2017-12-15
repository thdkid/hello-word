(function() {
  'use strict';

  angular
    .module('app.admin.song')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'adminsong',
        config: {
          url: '/Admin/Songs',
          views: {
              'main': {
                templateUrl: 'app/admin/layout.html'
              },
              'content@adminsong': {
                templateUrl: 'app/admin/songmanager/songmanager.html',
                controller: 'AdminSongController',
                controllerAs: 'vm',
              }
            },
          title: 'Admin Song'
        }
      }
    ];
  }
})();
