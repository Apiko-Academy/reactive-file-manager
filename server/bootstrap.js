
function getFileSystem({ _id: parent_id = null, fullPath: path, relativePath }, result) {
    let files = fs.readdirSync(path).map((file) => {
        return {
            _id: new Meteor.Collection.ObjectID().valueOf(),
            fullPath: `${path}/${file}`,
            relativePath: `${relativePath}/${file}`,
            name: file,
            isDirectory: fs.lstatSync(`${path}/${file}`).isDirectory(),
            parent_id: parent_id
        }
    });

    result.push(...files);

    files.forEach((file) => {
        if (file.isDirectory) {
            getFileSystem(file, result);
        }
    });

}

Meteor.startup(() => {
    const parent = {
        fullPath: process.env.PWD,
        relativePath: ''
    };

    if (!Files.find().count()) {
        let files = [];

        getFileSystem(parent, files);

        files.forEach((file) => {
            Files.insert(file);
        });
    }
    //chokidar.watch(path, {
    //                ignored: /[\/\\]\./,
    //                cwd: '.',
    //                ignorePermissionErrors: false
    //            })
    //        .on('all', (event, path) => {
    //            console.log(event, path);
    //        })
    //        .on('error', (event, path) => {
    //            console.log(event, path);
    //        });
});

