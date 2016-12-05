import React from 'react';
import { connect } from 'react-redux';

// Load actions
import { logOutUser } from '../../actions/actions_user';

// components
import Loading from '../shared/Loading.js';

class LogOut extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false
        };
    }
    
    _handleLogOut(e) {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.dispatch(logOutUser())
            .then((response) => {
                location.reload();
            });
    }
    
    render() {
        if (this.state.loading) {
            return <div className="well"><Loading message="Logging out" /></div>;
        }
        return (
            <div className="well">
                <h3>Done what you came for?</h3>
                <button className="btn btn-danger btn-lg" onClick={this._handleLogOut.bind(this)}><i className="fa fa-sign-out"></i> Log Out</button>
            </div>
        );
    }
}

export default connect()(LogOut);