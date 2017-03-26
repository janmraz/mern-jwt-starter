import React from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../../actions/actions_user';
const ls = require('local-storage');

// components
import Alert from '../shared/Alert.js';
import LogOut from './LogOut.js';

class Account extends React.Component {
    componentDidMount(){
        let id = ls('user.id');
        this.props.dispatch(fetchUserInfo(id));
    }
    render() {
        return (
            <div className="container text-center">
                <Alert />
                <p>You are logged in as...</p>
                <h1>{this.props.user.name}</h1>
                <LogOut />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user
    };
})(Account);