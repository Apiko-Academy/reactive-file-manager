describe('Chimp Mocha', function () {
  var url = 'http://localhost:3000';
  before(function () {
    browser.url(url);
  });
  describe('Page title', function () {
    it('should have the right title @watch', function () {
      expect(browser.getTitle()).to.equal('Awesome file manager');
    });
  });
  describe('Page header', function () {
    it('should have header @watch', function () {
      var isExists = browser.waitForExist('h1');
      chai.assert(isExists);
    });
    it('should the right header @watch', function () {
      var header = browser.getText('h1');
      expect(header).to.equal('File Manager');
    });
  });
  describe('Node list', function () {

    it('should show the directory content @watch', function () {
      var folderClass = '.fa-folder-o + span + a';

      var isExists = browser.waitForExist(folderClass);

      if(isExists) {
        var text = browser.getText(folderClass);

        browser.click(folderClass);

        expect(browser.getUrl()).to.equal(url + '/' + text[0]);
      }
    });
    it('should show the file content @watch', function () {
      browser.url(url);

      var fileClass = '.fa-file-o + span + a';

      var isExists = browser.waitForExist(fileClass);

      if(isExists) {
        var text = browser.getText(fileClass);

        browser.click(fileClass);

        expect(browser.getUrl()).to.equal(url + '/' + text[0]);
        expect(browser.elements('list-group-item').length).to.be.an('undefined');
        expect(browser.element('pre')).to.exists;
      }
    });
  });
});