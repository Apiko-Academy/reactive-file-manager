const { Link } = ReactRouter;

Breadcrumbs = React.createClass({
    getHomeLink(isActive) {
        if (isActive) {
            return <li className="active">Home</li>;
        } else {
            return <li><Link to="/">Home</Link></li>
        }
    },
    render() {
        const { path } = this.props;
        const links = path.split('/');
        const isHomeActive = !links[0];
        return (
            <ol className="breadcrumb">
                {this.getHomeLink(isHomeActive)}
                {links.map((link, i) => {
                    if (i == links.length - 1) {
                        return <li key={i} className="active">{link}</li>
                    }
                    return <li key={i}><Link to={`/${links.slice(0, i + 1).join('/')}`}>{link}</Link></li>
                })}
            </ol>
        )
    }
});