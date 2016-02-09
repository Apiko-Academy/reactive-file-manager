Files = new Mongo.Collection('files');

if (Meteor.isServer) {
    Meteor.publish('files', (path) => {
        if (path) {
            const directory = Files.findOne({ relativePath: `/${path}` });

            return Files.find({ parent_id: directory._id });
        }

        return Files.find({ parent_id: null });
    });
}