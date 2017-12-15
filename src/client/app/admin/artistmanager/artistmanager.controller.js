(function() {
  'use strict';

  angular
    .module('app.admin.artist')
    .controller('AdminArtistController', AdminArtistController);

  AdminArtistController.$inject = ['logger', '$scope', '$stateParams', 'dataservice', '$q'];
  function AdminArtistController(logger, $scope, $stateParams, dataservice, $q) {
    var vm = this;
    var check = true;
    vm.title = 'Admin Artist';
    vm.artists = [];
    activate();


    function activate() {
      var promises = [getArtists()];
      return $q.all(promises).then(function () {
        logger.info('Activated Admin Artist');
      });
    }

    function getArtists() {
      return dataservice.getArtist().then(function (data) {
        vm.artists = data;
        return vm.artists;
      });
    }

    // ng-blur Tab khoi vm.singer
    // vm.checkIndex = function () {

    //   var checksing = false; // kiem tra ton tai trong mang
    //   if(vm.tempsingers.length>0)
    //     {
    //       vm.singer=vm.tempsingers[0].name;
    //     }
    //   else
    //     {
    //       vm.singer=null;
    //     }
    // }

    // Tim kiem ca si
    // vm.searchSinger = function () {
    //   searchSinger();
    // }

    // function searchSinger() {
    //   if (vm.singer !== null && vm.singer !== '') {
    //     return dataservice.getSearchSinger(vm.singer).then(function (data) {
    //       vm.tempsingers = data;
    //       return vm.tempsingers;
    //     });
    //   }
    // }


    vm.resetData = function () {
      vm.name = '';
    };

    vm.Add = function () {
      vm.resetData();
      check = true;
      vm.showdbs = false;
    };

    vm.DataInput = function (getId) {
      // add db
      if (check === true) {
        var temp = {
          name: vm.name,
        };
        dataservice.addArtist(temp).then(function (response) {});
        dataservice.getArtist().then(function (data) {
          vm.artists = data;
        });
      }
      // update db
      else {
        var tempData = {
          name: vm.name
        };
        dataservice.updateArtist(getId, tempData).then(function (data) {});
        dataservice.getArtist().then(function (data) {
          vm.artists = data;
        });
      }
    };

    vm.Del = function (getId) {
          dataservice.deleteArtist(getId);
          dataservice.getArtist().then(function (data) {
          vm.artists = data;
        });
    };

    vm.Edit = function (getId) {
      check = false;
      for (var i = 0; i < vm.artists.length; i++) {
        if (getId === vm.artists[i]._id) {
          vm.id = vm.artists[i]._id;
          vm.name = vm.artists[i].name;
        }
      }
    };
  }
})();
