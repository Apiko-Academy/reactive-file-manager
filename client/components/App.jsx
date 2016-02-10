let currentNode = new ReactiveVar(null);

App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const { splat: nodePath } = this.props.params;

    Meteor.call('getFileByRelativePath', nodePath, (err, res) => {
      const node = currentNode.get();

      const isEquals = JSON.stringify(node) === JSON.stringify(res);

      if (! isEquals) {
        currentNode.set(res);
      }
    });

    Meteor.subscribe('files', currentNode.get());

    return {
      list: Files.getFilesByParent(currentNode.get()).fetch(),
      currentNode: currentNode.get()
    };
  },
  getMarkdownText(string) {
    return { __html: `<pre>${string}</pre>` };
  },
  getFileContent() {
    const { currentNode } = this.data;

    if (currentNode && currentNode.isFile) {
      return <div dangerouslySetInnerHTML={this.getMarkdownText(currentNode.content)}></div>
    }
  },
  getNodeList() {
    const { list } = this.data;

    if (list.length) {
      return <NodeList list={list}/>;
    }
  },
  render() {
    return (
      <div className="container-fluid">
        <h1>File Manager</h1>
        <Breadcrumbs filePath={this.props.params.splat} />
        {this.getNodeList()}
        {this.getFileContent()}
      </div>
    )
  }
});
