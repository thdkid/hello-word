(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$q', 'dataservice', 'logger', '$window', '$http'];

  /* @ngInject */
  function HomeController($q, dataservice, logger, $window, $http) {
    var vm = this;

    vm.songs = [];  // list song from songs.json
    vm.messageCount = 0; // chua xai
    vm.people = [];     // chua xai
    vm.title = 'BXH';   // thang huy meo thich xai
    vm.videos = []; //list videos

    vm.goTop = function goTop() {
      $window.scrollTo(0, 0);
    };

    //----------Tab BXH-----------//
    vm.currentTab = 1; //tab bxh
    vm.changeTab = function (index) {
      vm.currentTab = index;
    };

    vm.isActiveTab = function (index) {
      return index === vm.currentTab;
    };
    //----------Tab BXH-----------//

    vm.goTop = function goTop() {
      $window.scrollTo(0, 0);
    };

    activate();

    function activate() {
      var promises = [getMessageCount(), getRankSongs(), getRankVideos()];
      return $q.all(promises).then(function () {
        logger.info('Activated Dashboard View');
      });
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function (data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    /*function getPeople() {
      return dataservice.getPeople().then(function (data) {
        vm.people = data;
        return vm.people;
      });
    }*/

    function getRankSongs() {
      return dataservice.getRankSongs('Việt Nam').then(function (data) {
        vm.songs = data;
        return vm.songs;
      });
    }

    function getRankVideos() {
      return dataservice.getRankVideos('Việt Nam').then(function (data) {
        vm.videos = data;
        return vm.videos;
      });
    }
  }
})();
