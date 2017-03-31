const React = require('react');
const {Link, IndexLink} = require('react-router');

class Nav extends React.Component {
    
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="col-md-10 col-md-offset-1">

                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-collapse" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <IndexLink to="/" className="navbar-brand" activeClassName="active">Whatever</IndexLink>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="menu-collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/profile" activeClassName="active">Profile</Link>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/state" activeClassName="active">State</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/people" activeClassName="active">People</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/chats" activeClassName="active">Chats</Link>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/account" activeClassName="active">Account</Link>
                            </li>
                        </ul>
                    
                    </div>
                
                </div>
            </nav>
        );
    }
}

export default Nav;