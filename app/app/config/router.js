// Router set up
const React = require('react');
const {Route, Router, IndexRoute, browserHistory} = require('react-router');
let ls = require('local-storage');

// Components
import Main from '../components/App/Main';
import Home from '../components/App/Home';
import About from '../components/App/About';
import Account from '../components/App/Account';
import Profile from '../components/App/Profile';
import Auth from '../components/App/Auth';

// Routes
const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
            <Route path='/app/chats' header='About' component={About} />
            <Route path='/app/people' header='About' component={About} />
            <Route path='/app/search' header='About' component={About} />
            <Route path='/app/profile' header='Profile' component={Profile} />
            <Route path='/app/account' header='User Account' component={Account} />
        </Route>
    </Router>
);

const unauthorizedRoutes = (
    <Router history={browserHistory}>
        <Route path='/*' component={Auth} />
    </Router>
);

export default ls('token') != null ? routes : unauthorizedRoutes;