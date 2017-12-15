/* jshint -W117, -W030 */
describe('videos routes', function() {
  describe('state', function() {
    var view = 'app/videos/videos.html';

    beforeEach(function() {
      module('app.videos', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state videos to url /videos ', function() {
      expect($state.href('videos', {})).to.equal('/videos');
    });

    it('should map /videos route to videos View template', function() {
      expect($state.get('videos').templateUrl).to.equal(view);
    });

    it('of videos should work with $state.go', function() {
      $state.go('videos');
      $rootScope.$apply();
      expect($state.is('videos'));
    });
  });
});
