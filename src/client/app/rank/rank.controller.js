(function () {
  'use strict';

  angular
    .module('app.rank')
    .controller('RankController', RankController);

  RankController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function RankController($q, dataservice, logger) {
    var vm = this;
    vm.country = ['Việt Nam', 'Âu Mỹ', 'Hàn Quốc'];
    //------------Functions active Tab1, tab2--------------//
    vm.thaydoiTab1 = 0; //Biến lưu trữ vị trí tab cấp 1
    vm.thaydoiTab2 = 0; //Biến lưu trữ vị trí tab cấp 2
    vm.changeTab1 = function (index) {
      vm.thaydoiTab1 = index;
      var promises = [getRankSongs(vm.thaydoiTab1),getRankVideos(vm.thaydoiTab1)];
      return $q.all(promises);
    };
    vm.changeTab2 = function (index) {
      vm.thaydoiTab2 = index;
    };
    vm.isActiveTab1 = function (index) {
      return index === vm.thaydoiTab1;
    };
    vm.isActiveTab2 = function (index) {
      return index === vm.thaydoiTab2;
    };
    //------------Functions active Tab1, tab2--------------//

    //------------Functions đổ dữ liệu lên bảng--------------//
    function getRankSongs() {
      return dataservice.getRankSongs(vm.country[vm.thaydoiTab1]).then(function (data) {
        vm.songs = data;
        return vm.songs;
      });
    }

    function getRankVideos() {
      return dataservice.getRankVideos(vm.country[vm.thaydoiTab1]).then(function (data) {
        vm.videos = data;
        return vm.videos;
      });
    }
    //------------end Functions đổ dữ liệu lên bảng--------------//
    activate();
    function activate() {
      getRankSongs();
      getRankVideos();
      logger.info('Activated Rank View');
    }
  }

})();
