(function () {
  'use strict';

  angular
    .module('app.playlist')
    .controller('PlaylistController', PlaylistController);

  PlaylistController.$inject = ['$q', 'dataservice', 'logger', '$stateParams'];
  function PlaylistController($q, dataservice, logger, $stateParams) {
    var vm = this;
    vm.selectObj = null;
    vm.select = 'update';
    vm.name = null;
    vm.playlists = [];

    vm.deleteSong = function (id, idSong) {
      if (window.confirm('Bạn có chắc muốn xóa?')) {
        dataservice.deleteSonginPlaylist(id, idSong).then(function (res) {
          alert('Đã xóa bài hát');// jshint ignore:line
          dataservice.getPlaylistDetail(id).then(function(res){
            vm.getObj(res);
          }); 
        });
      }
    };

    vm.getObj = function (obj) {
      vm.selectObj = {
        id: obj._id,
        name: obj.name,
        listsong: obj.listsong
      };
    };

    vm.editPlaylist = function (obj) {
      var temp = {
        name: obj.name
      };
      dataservice.updatePlaylist(obj.id, temp).then(function (res) {
        alert(res.message); // jshint ignore:line
      });
      getPlaylist();
    };

    vm.addPlaylist = function () {
      var temp = {
        name: vm.name,
        id: $stateParams.userID
      };
      dataservice.addPlaylist(temp).then(function (res) { });
      getPlaylist();
    };

    vm.deletePlaylist = function (id) {
      if (window.confirm('Bạn có chắc muốn xóa?')) {
        dataservice.deletePlaylist(id).then(function (res) {
          alert(res.message); // jshint ignore:line
        });
        getPlaylist();
      }
    };

    activate();

    ////////////////

    function activate() {
      var promises = [getPlaylist()];
      return $q.all(promises).then(function () {
        logger.info('Activated Playlist View');
      });
    }

    function getPlaylist() {
      dataservice.getPlaylist($stateParams.userID).then(function (data) {
        vm.playlists = data;
      });
    }
  }
})();
