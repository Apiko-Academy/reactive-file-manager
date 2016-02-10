function observe(cursor) {
  if (cursor) {
    const observer = cursor.observeChanges({
      added: (id, fields) => {
        this.added('files', id, fields);
      },
      changed: (id, fields) => {
        this.changed('files', id, fields);
      },
      removed: (id) => {
        this.removed('files', id);
      }
    });

    this.ready();

    this.onStop(() => {
      observer.stop();
    });
  }
}
Meteor.publish('files', function (parent) {
  const cursor = Files.getFilesByParent(parent);

  observe.call(this, cursor);
});

//Meteor.publish('currentNode', function (filePath) {
//  const cursor = Files.getFileByRelativePath(filePath, true);
//  console.log(cursor.fetch());
//  observe.call(this, cursor);
//});
