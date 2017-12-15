(function () {
  'use strict';

  angular
    .module('app.albumdetail')
    .controller('AlbumDetailController', AlbumDetailController);

  AlbumDetailController.$inject = ['logger', 'dataservice', '$stateParams', '$http', '$q', '$filter'];
  /* @ngInject */
  function AlbumDetailController(logger, dataservice, $stateParams, $http, $q, $filter) {
    var vm = this;
    vm.title = 'Album detail';
    vm.playlists = null;
    vm.playlistSelect = null;
    vm.songs = [];
    var tracks = [];
    var number = 1;

    function getPlayAlbum() {
      dataservice.getPlayAlbum($stateParams.albumID).then(function (data) {
        vm.playlist = data;
        tracks = data.listplays;
        vm.test = tracks.length;
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
                  audio.src = mediaPath + tracks[id].url; //+ extension;
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

    //--------------

    activate();

    function activate() {
      var promises = [getPlayAlbum()];
      return $q.all(promises).then(function () {
        logger.info('Activated Album detail View');
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s); js.id = id;
      /*jshint quotmark: single */
      js.src = '//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.9&appId=262517760777708';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }
})();
