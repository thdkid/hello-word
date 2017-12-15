(function() {
  'use strict';

  angular
    .module('app.footer')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'footer',
        config: {
          url: '/Rank',
          templateUrl: 'app/layout/footer.html',
          controller: 'FooterController',
          controllerAs: 'vm',
          title: 'Ranks',
          settings: {
            nav: 4,
            content: '<i class="fa fa-trophy"></i>'
          }
        }
      }
    ];
  }
})();
