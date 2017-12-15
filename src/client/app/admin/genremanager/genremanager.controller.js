(function() {
  'use strict';

  angular
    .module('app.admin.genre')
    .controller('AdminGenreController', AdminGenreController);

  AdminGenreController.$inject = ['logger', '$scope', '$stateParams', 'dataservice', '$q'];
  function AdminGenreController(logger, $scope, $stateParams, dataservice, $q) {
    var vm = this;
    var check = true;
    vm.title = 'Admin Genre';
    vm.genres = [];
    activate();


    function activate() {
      var promises = [getGenres()];
      return $q.all(promises).then(function () {
        logger.info('Activated Admin Genre');
      });
    }

    function getGenres() {
      return dataservice.getGenres().then(function (data) {
        vm.genres = data;
        return vm.genres;
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
        dataservice.addGenre(temp).then(function (response) {});
        dataservice.getGenres().then(function (data) {
          vm.genres = data;
        });
      }
      // update db
      else {
        var tempData = {
          name: vm.name
        };
        dataservice.updateGenre(getId, tempData).then(function (data) {});
        dataservice.getGenres().then(function (data) {
          vm.genres = data;
        });
      }
    };

    vm.Del = function (getId) {
          dataservice.deleteGenre(getId);
          dataservice.getGenres().then(function (data) {
          vm.genres = data;
        });
    };

    vm.Edit = function (getId) {
      check = false;
      for (var i = 0; i < vm.genres.length; i++) {
        if (getId === vm.genres[i]._id) {
          vm.id = vm.genres[i]._id;
          vm.name = vm.genres[i].name;
        }
      }
    };
  }
})();
