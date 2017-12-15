(function() {
  'use strict';

  angular
    .module('app.callback')
    .controller('CallBackController', CallBackController);

  CallBackController.$inject = ['logger','$scope'];
  /* @ngInject */
  function CallBackController(authService, $scope) {
    var vm = this;
    vm.profile = [];
    vm.title = 'Callback';

    activate();

    function activate() {
    }
  }
})();
