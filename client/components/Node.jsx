const { Link } = ReactRouter;

Node = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    type: React.PropTypes.string
  },
  getInitialState() {
    return {
      isHovered: false
    }
  },
  handleMouseOver() {
    this.setState({
      isHovered: true
    })
  },
  handleMouseOut() {
    this.setState({
      isHovered: false
    })
  },
  getIconClass(file) {
    return file.isDirectory ? 'fa-folder-o' : 'fa-file-o';
  },
  render() {
    const { file } = this.props;
    const liClass = classNames('list-group-item', { active: this.state.isHovered });
    const iconClass = classNames('fa', { [this.getIconClass(file)]: true }, 'fa-fw', 'fa-1x');
    return (
      <li onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} className={liClass}>
        <i className={iconClass}></i>&nbsp; <Link tabIndex="-1" to={file.relativePath}>{file.name}</Link>
      </li>
    );
  }
});