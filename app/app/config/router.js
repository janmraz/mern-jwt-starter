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
import People from '../components/App/People';
import Auth from '../components/App/Auth';
import Detail from '../components/App/Detail';
import Chat from '../components/Chat/Chat';
import Chats from '../components/App/Chats';
import State from '../components/App/State';

// Routes
const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
            <Route path='about' header='About' component={About} />
            <Route path='people' header='People' component={People} />
            <Route path='state' header='State' component={State} />
            <Route path='profile' header='Profile' component={Profile} />
            <Route path='account' header='Account' component={Account} />
            <Route path='chats' header='Chats' component={Chats} />
            <Route path='/app/user/:id' header='Detail' component={Detail} />
            <Route path='/app/chat/:id' header='Chat' component={Chat} />
        </Route>
    </Router>
);

const unauthorizedRoutes = (
    <Router history={browserHistory}>
        <Route path='/*' component={Auth} />
    </Router>
);

export default ls('token') != null ? routes : unauthorizedRoutes;