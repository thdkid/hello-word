(function() {
  'use strict';

  angular
    .module('app.admin')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'admin',
        config: {
          url: '/Admin',
          views: {
              'main': {
                templateUrl: 'app/admin/layout.html'
              },
              'content@admin': {
                templateUrl: 'app/admin/admin.home.html',
                controller: 'AdminController',
                controllerAs: 'vm',
              }
            },
          title: 'Admin',
          settings: {
            nav: 5,
            content: '<i class="fa fa-tasks"></i>'
          }
        }
      }
    ];
  }
})();
