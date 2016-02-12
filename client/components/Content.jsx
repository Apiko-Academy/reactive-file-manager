Content = React.createClass({
  propTypes: {
    content: React.PropTypes.string
  },
  getInnerHtml() {
    const { content } = this.props;

    return { __html: `<pre>${content}</pre>` }
  },
  render() {
    return (
      <div dangerouslySetInnerHTML={this.getInnerHtml()}></div>
    )
  }
});