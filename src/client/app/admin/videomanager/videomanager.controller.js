(function () {
  'use strict';

  angular
    .module('app.admin.video')
    .controller('AdminVideoController', AdminVideoController);

  AdminVideoController.$inject = ['logger','$scope','$stateParams','dataservice','$q'];
  /* @ngInject */
  function AdminVideoController(logger,$scope,$stateParams,dataservice,$q) {
    var vm = this;
    var check = true;
    vm.title = 'Admin Video';
    vm.songs = [];

    activate();

    vm.resetData = function () {
      vm.name = '';
      vm.artist = '';
      vm.url = '';
      vm.img = '';
      vm.genre = '';
      vm.singer = '';
      vm.lyrics = '';
    };

    vm.Add = function () {
      vm.resetData();
      check = true;
      vm.showdbs = false;
    };

    vm.DataInput = function (getId) {
      // add db
      if (check === true) {
        dataservice.uploadImage(vm.img);
        // dataservice.uploadMp3(vm.url);
        var tempData = {
          //id : newid,
          name: vm.name,
          artist: vm.artist,
          //url: vm.url.name,
          img: vm.img.name,
          genre: vm.genre,
          singer: vm.singer,
          lyrics: vm.lyric
        };
        dataservice.addSong(tempData).then(function (response) { });
        dataservice.getSongs().then(function (data) { vm.songs = data; });
      }
      // update db
      else {
        dataservice.uploadImage(vm.img);
        // dataservice.uploadMp3(vm.url);
        var temp = {
          //id : newid,
          name: vm.name,
          artist: vm.artist,
          //url : vm.url,
          img: vm.img.name,
          genre: vm.genre,
          singer: vm.singer,
          lyrics: vm.lyrics
        };
        dataservice.updateSong(getId, temp).then(function (data) { });
        dataservice.getSongs().then(function (data) { vm.songs = data; });
      }
    };

    vm.Del = function (getId) {
      for (var i = 0; i < vm.songs.length; i++) {
        if (getId === vm.songs[i]._id) {
          vm.songs.splice(i, 1);
          dataservice.deleteSong(getId);
        }
      }
    };

    $scope.checkfile = function() {
      console.log('img' + vm.img);
    };

    vm.Edit = function (getId) {
      check = false;
      vm.showdbs = true;
      for (var i = 0; i < vm.songs.length; i++) {
        if (getId === vm.songs[i]._id) {
          vm.id = vm.songs[i]._id;
          vm.name = vm.songs[i].name;
          vm.singer = vm.songs[i].singer;
          vm.artist = vm.songs[i].artist;
          //vm.url = vm.songs[i].url;
          //img
          vm.img = vm.songs[i].img;
          vm.genre = vm.songs[i].genre;
          vm.lyrics = vm.songs[i].lyrics;
        }
      }
    };

    function activate() {
      var promises = [getSongs()];
      return $q.all(promises).then(function () {
        logger.info('Activated Admin Videos');
      });
    }

    function getSongs() {
      return dataservice.getSongs().then(function (data) {
        vm.songs = data;
        return vm.songs;
      });
    }

  }
})();
