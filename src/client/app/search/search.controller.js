(function() {
  'use strict';

  angular
    .module('app.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['logger','$stateParams','dataservice','$q'];
  /* @ngInject */
  function SearchController(logger,$stateParams,dataservice,$q) {
    var vm = this;
    vm.title = 'Search';
    vm.tabHientai = 1;
    vm.select = 'update';
    vm.changeTab = function(index) {
      vm.tabHientai = index;
    };

    vm.isActiveTab = function(index) {
        return index === vm.tabHientai;
      };

    activate();

    function activate() {
      var promises = [getSearchSongs(), getSearchVideos()];
      return $q.all(promises).then(function () {
        logger.info('Activated Search View');
      });
    }

    function getSearchSongs() {
      return dataservice.getSearchSongs($stateParams.keywords).then(function (data) {
        vm.songs = data;
        return vm.songs;
      });
    }

    function getSearchVideos() {
      return dataservice.getSearchVideos($stateParams.keywords).then(function (data) {
        vm.videos = data;
        return vm.songs;
      });
    }

  }
})();
