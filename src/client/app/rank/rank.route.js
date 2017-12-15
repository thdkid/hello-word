(function() {
  'use strict';

  angular
    .module('app.rank')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'rank',
        config: {
          url: '/Rank',
          views: {
            'main': {
              templateUrl: 'app/layout/layout.client.html'
            },
            'content@rank': {
              templateUrl: 'app/rank/rank.html',
              controller: 'RankController',
              controllerAs: 'vm'
            }
          },
          title: 'Ranks',
          settings: {
            nav: 5,
            content: '<i class="fa fa-trophy"></i>'
          }
        }
      }
    ];
  }
})();
