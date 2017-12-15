(function() {
  'use strict';

  angular
    .module('app.admin.singer')
    .controller('AdminSingerController', AdminSingerController);

  AdminSingerController.$inject = ['logger', '$scope', '$stateParams', 'dataservice', '$q'];
  function AdminSingerController(logger, $scope, $stateParams, dataservice, $q) {
    var vm = this;
    var check = true;
    vm.title = 'Admin Singer';
    vm.singers = [];
    activate();


    function activate() {
      var promises = [getSingers()];
      return $q.all(promises).then(function () {
        logger.info('Activated Admin Singers');
      });
    }

    function getSingers() {
      return dataservice.getSinger().then(function (data) {
        vm.singers = data;
        return vm.singers;
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
        dataservice.addSinger(temp).then(function (response) {});
      }
      // update db
      else {
        var tempData = {
          name: vm.name
        };
        dataservice.updateSinger(getId, tempData).then(function (data) {});
      }
      getSingers();
    };

    vm.Del = function (getId) {
          dataservice.deleteSinger(getId);
          dataservice.getSinger().then(function (data) {
          vm.singers = data;
        });
    };

    vm.Edit = function (getId) {
      check = false;
      for (var i = 0; i < vm.singers.length; i++) {
        if (getId === vm.singers[i]._id) {
          vm.id = vm.singers[i]._id;
          vm.name = vm.singers[i].name;
        }
      }
    };
  }
})();
