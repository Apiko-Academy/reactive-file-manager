if (Meteor.isClient) {
  Files = new Mongo.Collection('files');
}

if (Meteor.isServer) {
  Files = new Mongo.Collection(null);
}

Files.getFileByRelativePath = function (filePath, isPublish = false) {
  if (! filePath) {
    return null;
  }

  const compatiblePath = FS.getCompatiblePath(filePath);

  if (isPublish) {
    return Files.find({ relativePath: compatiblePath });
  }

  const file =  Files.findOne({ relativePath: compatiblePath });

  if (file) {
    file.content = FS.getFileContent(file);
  }

  return file;
};

Files.getFilesByParent = function (parent) {
  return parent ? Files.find({ parent_id: parent._id }, { sort : { isDirectory: -1 } })
    : Files.find({ parent_id: null }, { sort : { isDirectory: -1 } });
};

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      getFileContent(filePath) {
        return FS.getFileContent(filePath);
      },
      getFileByRelativePath(filePath) {
        return Files.getFileByRelativePath(filePath);
      }
    });
  });
}

