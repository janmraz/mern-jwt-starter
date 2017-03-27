import React from 'react';
import { connect } from 'react-redux';
import { detailUserInfo, changeLocation } from '../../actions/actions_user';
import ChangeLocation from './ChangeLocation';
import { browserHistory } from 'react-router';
const ls = require('local-storage');
const moment = require('moment');

// components
import Alert from '../shared/Alert.js';


class Profile extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            id: '',
            picture: '',
            name: '',
            work: '',
            education: '',
            location: '',
            change: false
        }
    }
    componentDidMount(){
        let id = this.props.params.id;
        this.props.dispatch(detailUserInfo(id));
    }
    render() {
        let years = '';
        if(this.props.user){
            let array = moment(this.props.user.birthday).fromNow().split(' ');
            years = <h4>{array[0] + ' ' + array[1] + ' old'}</h4>;
            return (
                <div>
                    <div className="container text-center">
                        <Alert />
                        <p>Profile</p>
                        <h1>{this.props.user.name}</h1>
                        <img src={this.props.user.picture} />
                        <h4>{this.props.user.email}</h4>
                        <h4>{this.props.user.education}</h4>
                        <h4>{this.props.user.work}</h4>
                        <h4>{this.props.user.location}</h4>
                        {years}
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <div className="container text-center">
                        <Alert />
                        <p>Loading ...</p>
                    </div>
                </div>
            );
        }

    }
}

export default connect((state) => {
    return {
        user: state.detail
    };
})(Profile);