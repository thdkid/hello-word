(function() {
  'use strict';

  angular
    .module('app.admin.artist')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'adminartist',
        config: {
          url: '/Admin/Artist',
          views: {
              'main': {
                templateUrl: 'app/admin/layout.html'
              },
              'content@adminartist': {
                templateUrl: 'app/admin/artistmanager/artistmanager.html',
                controller: 'AdminArtistController',
                controllerAs: 'vm',
              }
            },
          title: 'Admin Artist'
        }
      }
    ];
  }
})();
