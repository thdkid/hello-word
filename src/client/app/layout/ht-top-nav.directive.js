(function () {
  'use strict';

  angular
    .module('app.layout')
    .directive('htTopNav', htTopNav);

  /* @ngInject */
  function htTopNav() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'app/layout/ht-top-nav.html'
    };

    TopNavController.$inject = ['$scope', 'authService', 'logger', '$http', '$q',
      '$filter', '$timeout', '$state', 'Idle', 'dataservice'];

    /* @ngInject */
    function TopNavController($scope, authService, logger, $http, $q, $filter, $timeout, $state, Idle, dataservice) {
      var vm = this;
      var users = null;
      vm.profile = null;
      $scope.isCollapsed = true; //isCollapsed
      $scope.started = false; //Section status
      vm.auth = authService; //Auth0 service
      vm.query = null; //Search String
      vm.hide = false; //Show status
      vm.songs = []; //List song
      vm.videos = []; //List video

      //Change state playlist
      vm.playlist = function () {
        $state.go('playlist', { userID: sessionStorage.getItem('id') });
      };

      //Enter key event with search string
      vm.myFunct = function (keyEvent) {
        if (keyEvent.which === 13 && vm.query !== null && vm.query !== '') {
          keyEvent.target.blur();
          $state.go('search', { keywords: vm.query });
        }
      };

      //Check query string before go state
      vm.goSearch = function () {
        if (vm.query !== null && vm.query !== '') {
          $state.go('search', { keywords: vm.query });
        }
      };

      vm.checkAdmin = function () {
        if (users) {
          for (var i = 0; i < users.length; i++) {
            if (users[i].userID === sessionStorage.getItem('id') && users[i].authority === 'Admin') {
              sessionStorage.setItem('auth',true);
              startIdle();
              return true;
            }
          }
        }
        return false;
      };

      vm.goAdmin = function () {
        $state.go('admin');
      };

      //Check login before show avatar and name
      vm.checkLogin = function () {
        if (vm.auth.isAuthenticated()) {
          if (authService.getCachedProfile()) {
            vm.profile = authService.getCachedProfile();
            authService.setuserID();
            return true;
          } else {
            authService.getProfile(function (err, profile) {
              vm.profile = profile;
              authService.setuserID();
              return true;
            });
          }
        }
        return false;
      };

      //Logout
      vm.logout = function () {
        vm.auth.logout();
        stopIdle();
        document.getElementById('more-menu').style.display = 'none';
      };

      //Hide search tab
      vm.searchHide = function () {
        $timeout(function () {
          vm.hide = true;
        }, 150);
      };

      //Change vm.hide when query string change
      vm.searchNav = function () {
        vm.hide = false;
        getSearchSongs();
        getSearchVideos();
      };

      //Show search tab
      vm.searchShow = function () {
        if (vm.query !== null && vm.query != '' && vm.hide === false) // jshint ignore:line
        {
          return true;
        }
        return false;
      };

      //Check isResult
      vm.isKetQua = function () {
        if (vm.songs.length > 0) {
          return true;
        }
        return false;
      };

      function closeModals() {
        if ($scope.warning) {
          $scope.warning.close();
          $scope.warning = null;
        }

        if ($scope.timedout) {
          $scope.timedout.close();
          $scope.timedout = null;
        }
      }

      getUsers();

      function getUsers() {
        return dataservice.getUsers().then(function (data) {
          users = data;
          return users;
        });
      }

      //Get api search songs
      function getSearchSongs() {
        if (vm.query !== null && vm.query !== '') {
          return dataservice.getSearchSongs(vm.query).then(function (data) {
            vm.songs = data;
            return vm.songs;
          });
        }
      }

      //Get api search videos
      function getSearchVideos() {
        if (vm.query !== null && vm.query !== '') {
          return dataservice.getSearchVideos(vm.query).then(function (data) {
            vm.videos = data;
            return vm.videos;
          });
        }
      }

      function startIdle() {
        closeModals();
        Idle.watch();
        $scope.started = true;
      }

      function stopIdle() {
        closeModals();
        Idle.unwatch();
        $scope.started = false;
      }

      //Start Idle
      $scope.$on('IdleStart', function () {
        closeModals();
      });

      $scope.$on('IdleEnd', function () {
        closeModals();
      });

      $scope.$on('IdleTimeout', function () {
        closeModals();
        /*jshint quotmark:double */
        $scope.timedout = alert('Section timeout'); // jshint ignore:line
        vm.logout();
        $state.reload();
      });

    }

    return directive;
  }

})();
