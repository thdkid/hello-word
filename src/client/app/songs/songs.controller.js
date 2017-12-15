(function () {
  'use strict';

  angular
    .module('app.songs')
    .controller('SongsController', SongsController);

  SongsController.$inject = ['$q', 'dataservice', 'logger', '$http'];
  /* @ngInject */
  function SongsController($q, dataservice, logger, $http) {
    var vm = this;
    vm.title = 'Songs';

    function getSongsViet() {
      return dataservice.getNewSongs('Việt Nam').then(function (data) {
        vm.songsViet = data;
        return vm.songsViet;
      });
    }

    function getSongsAuMy() {
      return dataservice.getNewSongs('Âu Mỹ').then(function (data) {
        vm.songsAuMy = data;
        return vm.songsAuMy;
      });
    }

    function getSongsHan() {
      return dataservice.getNewSongs('Hàn Quốc').then(function (data) {
        vm.songsHan = data;
        return vm.songsHan;
      });
    }

    activate();

    function activate() {
      var promises = [getSongsViet(), getSongsAuMy(), getSongsHan()];
      return $q.all(promises).then(function () {
        logger.info('Activated Videos detail View');
      });
    }

  }
})();
