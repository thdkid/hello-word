(function () {
  'use strict';

  angular
    .module('app.admin.song')
    .controller('AdminSongController', AdminSongController);

  AdminSongController.$inject = ['logger', '$scope', '$stateParams', 'dataservice', '$q'];
  /* @ngInject */
  function AdminSongController(logger, $scope, $stateParams, dataservice, $q) {
    var vm = this;
    var checkfilehinh = true;
    var checkfilemp3 = true;
    vm.title = 'Admin Song';
    // biến tạm để lưu hình + mp3 khi sửa
    vm.tempimg = '';
    vm.tempmp3 = '';
    // mảng GET bài hát
    vm.songs = [];
    // mảng GET thể loại
    vm.genres = [];
    // mảng GET ca sĩ
    vm.singers = [];
    vm.tempsingers = [];
    // mảng GET search nhạc sĩ theo API request name nhạc sĩ
    vm.tempartists = [];
    activate();

    function activate() {
      var promises = [getSongs(), getGenres(), getSingers()];
      return $q.all(promises).then(function () {
        logger.info('Activated Admin Songs');
      });
    }


    // GET Bài hát
    function getSongs() {
      return dataservice.getSongs().then(function (data) {
        vm.songs = data;
        return vm.songs;
      });
    }

    // GET Thể loại
    function getGenres() {
      return dataservice.getGenres().then(function (data) {
        vm.genres = data;
        return vm.genres;
      });
    }

    // GET Ca sĩ
    function getSingers() {
      return dataservice.getSinger().then(function (data) {
        vm.singers = data;
        return vm.singers;
      });
    }

    // dataservice thêm bài hát
    function addSong(temp) {
      return dataservice.addSong(temp).then(function (response) {});
    }

    // dataservice cập nhật bài hát
    function updateSong(id, temp) {
      return dataservice.updateSong(id, temp).then(function (data) {});
    }

    // input nhạc sĩ
    vm.checkIndexArtist = function () {
      // If exist -> input = result - api find
      if (vm.tempartists.length > 0) {
        vm.artist = vm.tempartists[0].name;
      } else {
        vm.artist = null;
      }
    };

    // request api find artist
    vm.searchArtist = function () {
      if (vm.artist !== null && vm.artist !== '') {
        return dataservice.getSearchArtist(vm.artist).then(function (data) {
          vm.tempartists = data;
          return vm.tempartists;
          //result founded
        });
      }
    };

    // all input clear
    vm.resetData = function () {
      vm.name = null;
      vm.artist = null;
      vm.url = null;
      vm.img = null;
      vm.genre = null;
      vm.singer = null;
      vm.lyrics = null;
      // vm.country = null;
    };

    //Button ADD
    vm.Add = function () {
      // clear input
      vm.resetData();
      // show img from browser
      vm.showdbs = false;
      // show name mp3 form browser
      vm.showmp3 = false;
      // show button save adddb
      vm.adddb = true;
    };

    //
    vm.checkfilehinh = function (id) {
      // show img from browser
      vm.showdbs = false;
      checkfilehinh = false;
    };
    vm.checkfilemp3 = function (id) {
      // ng-change checkfilemp3
      checkfilemp3=false;
      // show url mp3 from browser
      vm.showmp3 = false;
    }

    // Button DELETE
    vm.Del = function (getId) {
      // delete
      dataservice.deleteSong(getId);
      // reload list songs
      getSongs();
    };
    // Button Edit
    vm.Edit = function (getId) {
      checkfilehinh = true;
      checkfilemp3 = true;
      // show button SAVE update
      vm.adddb = false;
      // show mp3 from db
      vm.showmp3 = true;
      // show img from db
      vm.showdbs = true;
      // get db to input
      for (var i = 0; i < vm.songs.length; i++) {
        if (getId === vm.songs[i]._id) {
          vm.id = vm.songs[i]._id;
          vm.name = vm.songs[i].name;
          vm.singer = vm.songs[i].singer.split(",");
          vm.artist = vm.songs[i].artist;
          vm.url = vm.songs[i].url;
          vm.img = vm.songs[i].img;
          vm.genre = vm.songs[i].genre;
          vm.lyrics = vm.songs[i].lyrics;
          vm.country = vm.songs[i].country;
          vm.tempimg = vm.songs[i].img;
          vm.tempmp3 = vm.songs[i].url;
        }
      }
      console.log('temp '+vm.tempimg);
    };

    // Button SAVE add db
    vm.AddInput = function () {
      dataservice.uploadImage(vm.img);
      dataservice.uploadMp3(vm.url);
      var temp = {
        name: vm.name,
        artist: vm.artist,
        url: vm.url.name,
        img: vm.img.name,
        genre: vm.genre,
        singer: vm.singer,
        lyrics: vm.lyrics,
        country:vm.country
      };
      addSong(temp);
      getSongs();
    }
    // Button SAVE Update db
    vm.EditInput = function (getId) {
      var tempimg = '';
      var tempmp3 = '';
      // checkfilehinh = false * da thay doi hinh khi sua
      if (checkfilehinh === false) {
        tempimg = vm.img.name;
        dataservice.uploadImage(vm.img);
        console.log('img edit upload '+vm.tempimg);
      }
      // ko thay doi hinh khi sua
      else if (checkfilehinh === true) {
        console.log('img not upload '+vm.tempimg);
        tempimg = vm.tempimg;
      }
      if (checkfilemp3 === false) {
        tempmp3 = vm.url.name;
        console.log('temp in edit not upload '+vm.tempimg);
        dataservice.uploadMp3(vm.url);
      } else if (checkfilemp3 === true) {
        console.log('mp3 not upload '+vm.tempimg);
        tempmp3 = vm.tempmp3;
      }
      var tempData = {
        name: vm.name,
        artist: vm.artist,
        img: tempimg,
        url: tempmp3,
        genre: vm.genre,
        singer: vm.singer,
        lyrics: vm.lyrics,
        country:vm.country
      };
      // dataservice.uploadMp3(vm.url);
      updateSong(getId, tempData);
      getSongs();
    }
  }
})();
