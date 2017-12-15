(function () {
  'use strict';

  angular
    .module('app.videodetail')
    .controller('VideoDetailController', VideoDetailController);

  VideoDetailController.$inject = ['logger', 'dataservice', '$stateParams', '$http', '$q', '$filter', '$sce'];
  /* @ngInject */
  function VideoDetailController(logger, dataservice, $stateParams, $http, $q, $filter, $sce) {
    var vm = this;
    vm.title = 'Video detail';
    vm.videos = [];
    activate();

    function activate() {
      var promises = [getPlayVideo()];
      return $q.all(promises).then(function () {
        getVideoSinger();
        recommendVideo();
        logger.info('Activated Video detail View');
      });
    }

    function getPlayVideo() {
      return dataservice.getVideoPlay($stateParams.videoID).then(function (data) {
        vm.videoObject = data;
        vm.url = $sce.trustAsResourceUrl(vm.videoObject.url);
      });
    }

    function getVideoSinger() {
      return dataservice.getVideoSinger(vm.videoObject.singer).then(function (data) {
        vm.videosinger = data;
        return vm.videosinger;
      });
    }

    function recommendVideo() {
      return dataservice.getRecommendVideo(vm.videoObject.name).then(function (data) {
        vm.videos = data;
        return vm.videos;
      });
    }

  }
})();
