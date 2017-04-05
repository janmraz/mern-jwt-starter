import React from 'react';
import { connect } from 'react-redux';
const ls = require('local-storage');

// Load actions
import { deleteUser } from '../../actions/actions_user';

// components
import Loading from '../shared/Loading.js';

class LogOut extends React.Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            loading: false
        };
    }

    handleDelete(e) {
        e.preventDefault();
        this.setState({ loading: true });
        let id = ls('user.id');
        this.props.dispatch(deleteUser(id)).then(()=>{
            location.reload();
        });
        location.reload();
    }

    render() {
        if (this.state.loading) {
            return <div className="well"><Loading message="Logging out" /></div>;
        }
        return (
            <div className="well">
                <h3>Delete?</h3>
                <button className="btn btn-danger btn-lg" onClick={this.handleDelete}><i className="fa fa-sign-out"></i> Delete account</button>
            </div>
        );
    }
}

export default connect()(LogOut);