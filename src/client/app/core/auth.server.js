(function () {

  'use strict';

  angular
    .module('app.core')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout'];

  function authService($state, angularAuth0, $timeout) {

    var userProfile = null;

    function login() {
      angularAuth0.authorize();
    }

    function handleAuthentication() {
      angularAuth0.parseHash(function (err, authResult) {
        if (authResult && authResult.idToken) {
          setSession(authResult);
          $state.go('home');
        } else if (err) {
          $timeout(function () {
            $state.go('home');
          });
          console.log(err);
        }
      });
    }

    function getProfile(cb) {
      var accessToken = sessionStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token must exist to fetch profile');
      }
      angularAuth0.client.userInfo(accessToken, function (err, profile) {
        if (profile) {
          setUserProfile(profile);
        }
        cb(err, profile);
      });
    }

    function setUserProfile(profile) {
      userProfile = profile;
    }

    function getCachedProfile() {
      return userProfile;
    }

    function setSession(authResult) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      sessionStorage.setItem('access_token', authResult.accessToken);
      sessionStorage.setItem('id_token', authResult.idToken);
      sessionStorage.setItem('expires_at', expiresAt);
    }

    function setuserID() {
      sessionStorage.setItem('id',userProfile.sub);
    }

    function logout() {
      // Remove tokens and expiry time from localStorage
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('id_token');
      sessionStorage.removeItem('expires_at');
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('auth');
      $state.go('home');
    }

    function isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    return {
      login: login,
      getProfile: getProfile,
      getCachedProfile: getCachedProfile,
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated,
      setuserID: setuserID
    };
  }
})();
