// Router set up
const React = require('react');
const {Route, Router, IndexRoute, browserHistory} = require('react-router');

// Components
import Main from '../components/App/Main';
import Home from '../components/App/Home';
import About from '../components/App/About';
import Account from '../components/App/Account';
import EmailConfirm from '../components/App/EmailConfirm';
import Lobby_Main from '../components/Lobby/Lobby_Main';
import Lobby_Home from '../components/Lobby/Lobby_Home';
import Lobby_Playroom from '../components/Lobby/Lobby_Playroom';

// Routes
const routes = (
    <Router history={browserHistory}> 
        <Route path="/app" component={Main}>
            <IndexRoute component={Home} />
            <Route path='/app/about' header='About' component={About} />
            <Route path='/app/account' header='User Account' component={Account} />
            <Route path='/app/email/:emailCode' header='Email Confirm' component={EmailConfirm} />
        </Route>
    </Router>
);

export default routes;