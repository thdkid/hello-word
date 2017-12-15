/* jshint -W117, -W030 */
describe('VideosController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.videos');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('VideosController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Videos controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Videos', function() {
        expect(controller.title).to.equal('Videos');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
