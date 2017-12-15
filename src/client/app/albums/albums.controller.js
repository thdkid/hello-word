(function () {
  'use strict';

  angular
    .module('app.albums')
    .controller('AlbumsController', AlbumsController);

  AlbumsController.$inject = ['$q', 'dataservice', 'logger', '$http'];
  /* @ngInject */
  function AlbumsController($q, dataservice, logger, $http) {
    var vm = this;
    vm.title = 'Albums';

    function getNewAlbum() {
      return dataservice.getNewAlbum().then(function (data) {
        vm.albums = data;
        return vm.albums;
      });
    }

    activate();

    function activate() {
      getNewAlbum();
      logger.info('Activated Albums View');
    }

  }
})();
