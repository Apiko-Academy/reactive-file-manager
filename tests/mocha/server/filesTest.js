if (! (typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function() {
    describe('Server initialization', function() {
      it('should insert files into the database after server start', function() {
        chai.assert(Files.find().count() > 0);
      });
    });
    describe('File watcher', function() {
      const basePath = process.env.BASE_PATH || process.env.PWD;
      const testFileContent = 'test';
      describe('Add new file', function() {
        const testFilePath = path.join(basePath, 'test.txt');
        before(function() {
          fs.writeFileSync(testFilePath, testFileContent);
        });
        after(function() {
          fs.unlinkSync(testFilePath);
        });
        it('should insert file into database after write', function(done) {
          //wait for watcher
          setTimeout(() => {
            const file = Files.findOne({ fullPath: testFilePath });
            chai.assert(file);
            chai.assert(file.isFile);
            done();
          }, 100);
        });
        it('should be parent null', function() {
          const file = Files.findOne({ fullPath: testFilePath });
          chai.assert(file.parent_id === null);
        });
        it('should not be a directory', function() {
          const file = Files.findOne({ fullPath: testFilePath });
          chai.assert.isFalse(file.isDirectory, 'this is not a directory');
        });
        it('should have content test', function() {
          const file = Files.findOne({ fullPath: testFilePath });
          chai.assert.strictEqual(testFileContent, FS.getFileContent(file), 'content equals test');
        });
      });
      describe('Add new directory and add file into it', function() {
        const testDirPath = path.join(basePath, 'test');
        const testFilePath = path.join(testDirPath, 'test.txt');
        before(function() {
          fs.mkdirSync(testDirPath);
          fs.writeFileSync(testFilePath, testFileContent);
        });
        after(function() {
          fs.unlinkSync(testFilePath);
          fs.rmdirSync(testDirPath);
        });
        it('should insert directory into database after mkdir', function(done) {
          //wait for watcher
          setTimeout(() => {
            const dir = Files.findOne({ fullPath: testDirPath });
            chai.assert(dir);
            chai.assert(dir.isDirectory);
            done();
          }, 100);
        });
        it('should have one file in it', function(done) {
          //wait for watcher
          setTimeout(() => {
            const dir = Files.findOne({ fullPath: testDirPath });
            const children = Files.getFilesByParent(dir).fetch();
            chai.assert(children[0]);
            done();
          }, 100);
        });
      });
    });
  });
}
