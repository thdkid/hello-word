(function () {
  'use strict';

  angular
    .module('app.videos')
    .controller('VideosController', VideosController);

  VideosController.$inject = ['$q' ,'logger', 'dataservice', '$http'];
  /* @ngInject */
  function VideosController($q ,logger, dataservice, $http) {
    var vm = this;
    vm.title = 'Videos';

    function getVideosViet() {
      return dataservice.getNewVideos('Việt Nam').then(function (data) {
        vm.videosViet = data;
        return vm.videosViet;
      });
    }

    function getVideosAuMy() {
      return dataservice.getNewVideos('Âu Mỹ').then(function (data) {
        vm.videosAuMy = data;
        return vm.videosAuMy;
      });
    }

    function getVideosHan() {
      return dataservice.getNewVideos('Hàn Quốc').then(function (data) {
        vm.videosHan = data;
        return vm.videosHan;
      });
    }

    activate();

    function activate() {
      var promises = [getVideosViet(), getVideosAuMy(), getVideosHan()];
      return $q.all(promises).then(function () {
        logger.info('Activated Videos detail View');
      });
    }

  }
})();
