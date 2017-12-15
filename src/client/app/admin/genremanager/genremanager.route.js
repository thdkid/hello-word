(function() {
  'use strict';

  angular
    .module('app.admin.genre')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'admingenre',
        config: {
          url: '/Admin/Genre',
          views: {
              'main': {
                templateUrl: 'app/admin/layout.html'
              },
              'content@admingenre': {
                templateUrl: 'app/admin/genremanager/genremanager.html',
                controller: 'AdminGenreController',
                controllerAs: 'vm',
              }
            },
          title: 'Admin Genre'
        }
      }
    ];
  }
})();
