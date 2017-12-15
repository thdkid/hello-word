(function () {
  'use strict';

  angular
    .module('app.songdetail')
    .controller('SongDetailController', SongDetailController);

  SongDetailController.$inject = ['logger', 'dataservice', '$stateParams', '$http', '$q', '$filter', 'authService', '$timeout'];
  /* @ngInject */
  function SongDetailController(logger, dataservice, $stateParams, $http, $q, $filter, authService, $timeout) {
    var vm = this;
    vm.auth = authService;
    vm.title = 'Song detail';
    vm.playlists = null;
    vm.playlistSelect = null;
    vm.songs = [];
    //-----Ham tao hieu ung Read more-----
    vm.readmore = 1; //Ta can active class tamSidebarBox
    //Lay gia tri cho truoc ben HTML
    vm.changeStatus = function (index) {
      vm.readmore = index;
    };
    //--------End Ham tao hieu ung Read more---------

    vm.checkLogin = function () {
      if (authService.isAuthenticated()) {
        getPlaylist();
        return true;
      }
      else {
        alert('Phải đăng nhập để thêm playlist'); // jshint ignore:line
        return false;
      }
    };

    vm.addtoPlaylist = function () {
      if (authService.isAuthenticated()) {
        var temp = {
          id: vm.songObject._id,
          name: vm.songObject.name,
          singer: vm.songObject.singer,
          file: vm.songObject.url,
          length: '--:--'
        };
        dataservice.addSongtoList(vm.playlistSelect, temp).then(function (res) {
          alert('Đã thêm vào Playlist'); // jshint ignore:line
        });
        getPlaylist();
      }
    };

    //--------------

    activate();

    function activate() {
      var promises = [getSongs(), facebook(), updatePlays()];
      return $q.all(promises).then(function () {
        getSongSinger();
        recommendSong();
        logger.info('Activated Songs detail View');
      });
    }

    function getPlaylist() {
      dataservice.getPlaylist(authService.getCachedProfile().sub).then(function (data) {
        vm.playlists = data;
      });
    }

    function getSongs() {
      return dataservice.getSongPlay($stateParams.songID).then(function (data) {
        vm.songObject = data;
      });
    }

    function getSongSinger() {
      return dataservice.getSongSinger(vm.songObject.singer).then(function (data) {
        vm.songsinger = data;
        return vm.songsinger;
      });
    }

    function recommendSong() {
      return dataservice.getRecommendSong(vm.songObject.name, vm.songObject.country).then(function (data) {
        vm.songs = data;
        return vm.songs;
      });
    }

    function updatePlays() {
      vm.counter = 0;
      var updateCounter = function () {
        vm.counter++;
        $timeout(updateCounter, 1000);
        if (vm.counter === 7) {          
          getCountPlays();
          return;
          //  thuc hien su kien ghi log 
        }
      };
      updateCounter();

    }

        function getCountPlays(){
      // ---goi countPlays---
      return dataservice.counterPlays($stateParams.songID).then(function (data) {
        vm.songObject = data;
      });

    }

    function facebook() {
      FB.init({
        appId: '1287710571326137',
        channelUrl: '//http://localhost:3000//index.html', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
      });
      // FB = null;
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.10&appId=1287710571326137";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      FB.XFBML.parse();
    }
  }
})();
