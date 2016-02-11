FS = {
  getFileSystem({ _id: parent_id = null, fullPath, relativePath }, result) {
    try {
      const files = fs.readdirSync(fullPath).map((filePath) => {
        const newFullPath = path.join(fullPath, filePath);
        const fileStat = fs.lstatSync(newFullPath);

        return {
          _id: new Meteor.Collection.ObjectID().valueOf(),
          fullPath: newFullPath,
          relativePath: path.join(relativePath, filePath),
          name: filePath,
          isDirectory: fileStat.isDirectory(),
          isFile: fileStat.isFile(),
          parent_id: parent_id
        }
      });

      result.push(...files);

      files.forEach((file) => {
        if (file.isDirectory) {
          this.getFileSystem(file, result);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  getFileContent(node, encoding = 'utf8') {
    if (node && node.isFile) {
      return fs.readFileSync(node.fullPath, encoding);
    }

    return null;
  },
  getCompatiblePath(filePath) {
    const pathArray = filePath.split('/');

    return path.join(...pathArray);
  }
};