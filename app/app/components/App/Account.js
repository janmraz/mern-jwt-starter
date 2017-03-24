import React from 'react';
import { connect } from 'react-redux';

// components
import Alert from '../shared/Alert.js';
import LogOut from './LogOut.js';
import Loading from '../shared/Loading.js';

// Load actions
import { requestEmailCode } from '../../actions/actions_user';

class Account extends React.Component {
    

    
    render() {
        if (!this.props.user.email) {
            // if no user info yet, return loading
            return <Loading message="Loading your account information" />;
        }
        return (
            <div className="container text-center">
                <Alert />
                <p>You are logged in as...</p>
                <h1>{this.props.user.email}</h1>
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