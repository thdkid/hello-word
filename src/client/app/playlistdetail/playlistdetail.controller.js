(function () {
  'use strict';

  angular
    .module('app.playlistdetail')
    .controller('PlaylistDetailController', PlaylistDetailController);

  PlaylistDetailController.$inject = ['$q', 'dataservice', 'logger', '$stateParams', '$scope', 'authService'];
  function PlaylistDetailController($q, dataservice, logger, $stateParams, $scope, authService) {
    var vm = this;
    var tracks = [];
    var number = 1;

    // Add user agent as an attribute on the <html> tag...
    // Inspiration: https://css-tricks.com/ie-10-specific-styles/
    var b = document.documentElement;
    b.setAttribute('data-useragent', navigator.userAgent);
    b.setAttribute('data-platform', navigator.platform);

    activate();

    ////////////////

    function activate() {
      var promises = [getPlaylist(), getSongs()];
      return $q.all(promises).then(function () {
        logger.info('Activated Playlist View');
      });
    }

    function getSongs() {
      return dataservice.getSongs().then(function (data) {
        vm.songs = data;
        return vm.songs;
      });
    }

    function getPlaylist() {
      dataservice.getPlaylistDetail($stateParams.id).then(function (data) {
        vm.playlist = data;
        tracks = data.listsong;
        if (tracks.length > 0) {
          jQuery(function ($) { // jshint ignore:line
            var supportsAudio = !!document.createElement('audio').canPlayType;
            if (supportsAudio) {
              var index = 0,
                playing = false,
                mediaPath = './src/server/data/songs/',
                extension = '',
                buildPlaylist = $.each(tracks, function (key, value) {
                  var trackNumber = number++,
                    trackName = value.name,
                    trackLength = value.length;
                  if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                  } else {
                    trackNumber = '' + trackNumber;
                  }
                  $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber +
                    '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' +
                    trackLength + '</div></div></li>'); // jshint ignore:line
                }),
                trackCount = tracks.length,
                npAction = $('#npAction'),
                npTitle = $('#npTitle'),
                audio = $('#audio1').bind('play', function () {
                  playing = true;
                  npAction.text('Now Playing...');
                }).bind('pause', function () {
                  playing = false;
                  npAction.text('Paused...');
                }).bind('ended', function () {
                  npAction.text('Paused...');
                  if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                  } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                  }
                }).get(0),
                btnPrev = $('#btnPrev').click(function () {
                  if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                      audio.play();
                    }
                  } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                  }
                }),
                btnNext = $('#btnNext').click(function () {
                  if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                      audio.play();
                    }
                  } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                  }
                }),
                li = $('#plList li').click(function () {
                  var id = parseInt($(this).index());
                  if (id !== index) {
                    playTrack(id);
                  }
                }),
                loadTrack = function (id) { // jshint ignore:line
                  $('.plSel').removeClass('plSel');
                  $('#plList li:eq(' + id + ')').addClass('plSel');
                  npTitle.text(tracks[id].name);
                  index = id;
                  audio.src = mediaPath + tracks[id].file; //+ extension;
                },
                playTrack = function (id) { // jshint ignore:line
                  loadTrack(id);
                  audio.play();
                };
              // extension = audio.canPlayType('audio/mpeg') ?
              //   '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
              loadTrack(index);
            }
          });
        }
      });
    }
  }
})();
