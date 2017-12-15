(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$httpParamSerializerJQLike', '$q', 'exception', 'logger', 'Upload'];
  /* @ngInject */
  function dataservice($http, $httpParamSerializerJQLike, $q, exception, logger, Upload) {
    var service = {
      //-----------User-------------------
      getUsers: getUsers,
      getUserDetail: getUserDetail,
      addUser: addUser,
      updateUser: updateUser,
      deleteUser: deleteUser,
      //-----------Song--------------------
      getSongs: getSongs, //Get list songs
      getRankSongs: getRankSongs, //Get Rank song
      getNewSongs: getNewSongs,
      getSongPlay: getSongPlay, //Get song play
      getSongSinger: getSongSinger, //get song singer
      getRecommendSong: getRecommendSong, //Get recommend song
      getSearchSongs: getSearchSongs, //Get search list songs
      addSong: addSong, //Add songs
      updateSong: updateSong, //Update
      deleteSong: deleteSong, //Delete
      //---------Singer------------------
      getSinger: getSinger,
      getSearchSinger: getSearchSinger,
      addSinger: addSinger,
      updateSinger: updateSinger,
      deleteSinger: deleteSinger,
      //--------Artist----------------
      getArtist: getArtist,
      getSearchArtist: getSearchArtist,
      addArtist: addArtist,
      updateArtist: updateArtist,
      deleteArtist: deleteArtist,
      //--------Genre----------------
      getGenres: getGenres,
      addGenre: addGenre,
      updateGenre: updateGenre,
      deleteGenre: deleteGenre,
      //---------Video----------------
      getVideos: getVideos, //Get list videos
      getSearchVideos: getSearchVideos, //Get search list videos
      getRankVideos: getRankVideos, //Get rank video
      getNewVideos: getNewVideos,
      getRecommendVideo: getRecommendVideo, //Get recommend video
      getVideoPlay: getVideoPlay, //Get video play
      getVideoSinger: getVideoSinger,
      //---------Albums----------------
      getNewAlbum: getNewAlbum,
      getPlayAlbum: getPlayAlbum,
      //---------Playlist----------------
      getPlaylist: getPlaylist,
      getPlaylistDetail: getPlaylistDetail,
      addPlaylist: addPlaylist,
      addSongtoList: addSongtoList,
      updatePlaylist: updatePlaylist,
      deletePlaylist: deletePlaylist,
      deleteSonginPlaylist: deleteSonginPlaylist,
      //----------Other---------------------
      getPeople: getPeople, //Exemple
      getMessageCount: getMessageCount, //Exemple
      uploadImage: uploadImage, //Upload file img
      uploadMp3: uploadMp3, //Upload file mp3
      counterPlays: counterPlays
    };

    return service;

     //get Singer
    function getSinger() {
      return $http.get('/api/getSinger')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load Genres has failed')(e);
      }
    }

    //get Genres
    function getGenres() {
      return $http.get('/api/getGenre')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load Genres has failed')(e);
      }
    }

    function getSearchSinger(request) {
      return $http.get('/api/searchSinger/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getSearchSinger')(e);
      }
    }

    function addSinger(data) {
      return $http({
        url: 'api/singer',
        method: 'POST',
        data: $httpParamSerializerJQLike(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }

    function updateSinger(id, data) {
      return $http.put('/api/singer/' + id, JSON.stringify(data))
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function deleteSinger(id) {
      return $http.delete('/api/singer/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }


    function getArtist() {
      return $http.get('/api/getArtist')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load Artist has failed')(e);
      }
    }

    function getSearchArtist(request) {
      return $http.get('/api/searchArtist/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getSearchArtist')(e);
      }
    }

    function addArtist(data) {
      return $http({
        url: 'api/artist',
        method: 'POST',
        data: $httpParamSerializerJQLike(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }

    function updateArtist(id, data) {
      return $http.put('/api/artist/' + id, JSON.stringify(data))
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function deleteArtist(id) {
      return $http.delete('/api/artist/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function addGenre(data) {
      return $http({
        url: 'api/genre',
        method: 'POST',
        data: $httpParamSerializerJQLike(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }

    function updateGenre(id, data) {
      return $http.put('/api/genre/' + id, JSON.stringify(data))
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function deleteGenre(id) {
      return $http.delete('/api/genre/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function getPlayAlbum(request) {
      //-------Get video by singer-------
      return $http.get('/api/albumplay/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load album has failed')(e);
      }
    }

    function getNewAlbum() {
      //-------Get video by singer-------
      return $http.get('/api/albumnew')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load album has failed')(e);
      }
    }

    //-----------------------API User-----------------------------------

    function deleteUser(id) {
      return $http.delete('/api/user/' + id)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function updateUser(id, data) {
      return $http.put('/api/user/' + id, JSON.stringify(data))
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function addUser(data) {
      return $http({
        url: 'api/user',
        method: 'POST',
        data: $httpParamSerializerJQLike(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }

    function getUserDetail(request) {
      return $http.get('/api/user/' + request)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catch('get user detail hsa failed')(e);
      }
    }

    function getUsers(request) {
      return $http.get('/api/user/')
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('get users has failed')(e);
      }
    }

    //-----------------------API Playlist---------------------------------

    function deleteSonginPlaylist(id,idSong) {
       return $http.delete('/api/playlist/' + id+'/' +idSong)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function addSongtoList(id, data) {
      return $http.put('/api/playlistpush/' + id, JSON.stringify(data))
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function getPlaylistDetail(id) {
      return $http.get('/api/playlist/' + id)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function updatePlaylist(id, data) {
      return $http.put('/api/playlist/' + id, JSON.stringify(data))
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function deletePlaylist(id) {
      return $http.delete('/api/playlist/' + id)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function addPlaylist(data) {
      return $http({
        url: 'api/playlist',
        method: 'POST',
        data: $httpParamSerializerJQLike(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }

    function getPlaylist(request) {
      return $http.get('/api/playlists/' + request)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('get playlist has failed')(e);
      }
    }
    //-----------------------------End API Playlist-------------------------------

    //----------------------------API Rank Video----------------------------
    function getRankVideos(request) {
      return $http.get('/api/rankvideo/' + request)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('get load rank video has failed')(e);
      }
    }

    function getNewVideos(request) {
      return $http.get('/api/newvideo/' + request)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('get load new video has failed')(e);
      }
    }

    function getRecommendVideo(request) {
      //---------Co the ban se thich-----------
      return $http.get('/api/recvideo/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load play video has failed')(e);
      }
    }

    function getVideoSinger(request) {
      //-------Get video by singer-------
      return $http.get('/api/videosinger/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load video singer has failed')(e);
      }
    }

    function getVideoPlay(request) {
      //-------Get and play video-------
      return $http.get('/api/video/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load play song has failed')(e);
      }
    }

    function getRecommendSong(request) {
      //---------Co the ban se thich-----------
      return $http.get('/api/recsong/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load play song has failed')(e);
      }
    }

    function getSongPlay(request) {
      //-------Get and play song-------
      return $http.get('/api/song/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load play song has failed')(e);
      }
    }

    function getSongSinger(request) {
      return $http.get('/api/songsinger/' + request)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('get load rank song has failed')(e);
      }
    }

    function getRankSongs(request) {
      return $http.get('/api/ranksong/' + request)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('get load rank song has failed')(e);
      }
    }

    function getNewSongs(request) {
      return $http.get('/api/newsong/' + request)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('get load new song has failed')(e);
      }
    }

    function uploadImage(file) {

      Upload.upload({
        url: 'api/uploadhinh',
        method: 'POST',
        headers: {
          'Content-Type': file.type
        },
        data: { file: file },
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }

    function uploadMp3(file) {

      Upload.upload({
        url: 'api/uploadmp3',
        method: 'POST',
        headers: {
          'Content-Type': file.type
        },
        data: { file: file },
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }

    function addSong(data) {
      return $http({
        url: 'api/songs',
        method: 'POST',
        data: $httpParamSerializerJQLike(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }

    function updateSong(id, data) {
      return $http.put('/api/songs/' + id, JSON.stringify(data))
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function deleteSong(id) {
      return $http.delete('/api/songs/' + id)
        .then(success)
        .catch(fail);
      function success(response) {
        return response.data;
      }
      function fail(e) {
        return exception.catcher('XHR')(e);
      }
    }

    function getSearchSongs(request) {
      return $http.get('/api/searchSong/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getSearch')(e);
      }
    }

    function getSearchVideos(request) {
      return $http.get('/api/searchVideo/' + request)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getSearch')(e);
      }
    }

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }

    function getSongs() {
      return $http.get('/api/song')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load Songs has failed')(e);
      }
    }

    function getVideos() {
      return $http.get('/api/video')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('get load Videos has failed')(e);
      }
    }

    function counterPlays(request){
      //---- khoa counter plays------
      return $http.put('/api/song/' + request)
        .then(success)
        .catch (fail);
      function success(response){
        return response.data;
      }
      function fail(e) {
        return exception.catcher('add plays has failed')(e);
      }
    }

  }
})();
