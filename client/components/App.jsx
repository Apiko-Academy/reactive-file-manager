App = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        Meteor.subscribe('files', this.props.params.splat);
        return {
            list: Files.find({}, { sort : { isDirectory: -1 } }).fetch()
        };
    },
    render() {
        const { list } = this.data;
        return (
            <div className="container-fluid">
                <h1>File Manager</h1>
                <Breadcrumbs path={this.props.params.splat}/>
                <NodeList list={list}/>
            </div>
        )
    }
});
