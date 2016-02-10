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
});

