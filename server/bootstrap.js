Meteor.startup(() => {
  const parent = {
    fullPath: process.env.PWD,
    relativePath: ''
  };

  if (! Files.find().count()) {
    let files = [];

    FS.getFileSystem(parent, files);

    files.forEach((file) => {
      Files.insert(file);
    });
  }

  const log = console.log.bind(console);

  const watcher = chokidar.watch(parent.fullPath, { ignoreInitial: true })
    .on('add', filePath => {
      Files.insert({
        _id: new Meteor.Collection.ObjectID().valueOf(),
        fullPath: filePath,
        relativePath: path.relative(parent.fullPath, filePath),
        name: path.basename(filePath),
        isDirectory: false,
        isFile: true,
        parent_id: null
      });
      log(`File ${filePath} has been added`)
    })
    .on('change', filePath => {
      log(`File ${filePath} has been changed`)
    })
    .on('addDir', filePath => {
      log(`Directory ${filePath} has been added`)
    })
    .on('unlink', filePath => {
      Files.remove({
        fullPath: filePath
      });
      log(`File ${filePath} has been removed`)
    })
    .on('unlinkDir', filePath => {
      log(`Directory ${filePath} has been removed`)
    });
});

