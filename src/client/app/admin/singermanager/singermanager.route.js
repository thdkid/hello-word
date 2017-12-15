(function() {
  'use strict';

  angular
    .module('app.admin.singer')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'adminsinger',
        config: {
          url: '/Admin/Singers',
          views: {
              'main': {
                templateUrl: 'app/admin/layout.html'
              },
              'content@adminsinger': {
                templateUrl: 'app/admin/singermanager/singermanager.html',
                controller: 'AdminSingerController',
                controllerAs: 'vm',
              }
            },
          title: 'Admin Singer'
        }
      }
    ];
  }
})();
