Meteor.startup(() => {
  const baseDir = {
    fullPath: process.env.BASE_PATH || process.env.PWD,
    relativePath: ''
  };

  if (! Files.find().count()) {
    let files = [];

    FS.getFileSystem(baseDir, files);

    files.forEach((file) => {
      Files.insert(file);
    });
  }

  const log = console.log.bind(console);
  log(baseDir.fullPath);
  const watcher = chokidar.watch(baseDir.fullPath, { ignoreInitial: true });

  ['add', 'addDir'].forEach( event => {
    watcher.on(event, filePath => {
      const parent = Files.findOne({fullPath: path.dirname(filePath)});

      Files.insert({
        _id: new Meteor.Collection.ObjectID().valueOf(),
        fullPath: filePath,
        relativePath: path.relative(baseDir.fullPath, filePath),
        name: path.basename(filePath),
        isDirectory: false,
        isFile: true,
        parent_id: parent ? parent._id : null
      });

      log(`Node ${filePath} has been added`);
    });
  });

  watcher
    .on('change', filePath => {
      log(`File ${filePath} has been changed`)
    })
    .on('unlink', filePath => {
      Files.remove({
        fullPath: filePath
      });

      log(`File ${filePath} has been removed`)
    })
    .on('unlinkDir', filePath => {
      //Run recursively
      const dir = Files.findOne({ fullPath: filePath });

      if (dir) {
        Files.remove({
          _id: dir._id
        });

        const children = Files.getFilesByParent(dir).fetch();

        children.forEach((child) => {
          Files.remove({
            _id: child._id
          })
        });
      }

      log(`Directory ${filePath} has been removed`)
    })
    .on('error', error => {
      log(error)
    });
});

