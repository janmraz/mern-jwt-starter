import React from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, changeLocation,editUser } from '../../actions/actions_user';
import EditUser from './EditUser';
import { browserHistory } from 'react-router';
const ls = require('local-storage');
const moment = require('moment');

// components
import Alert from '../shared/Alert.js';


class Profile extends React.Component {
    constructor(){
        super();
        this.changeLocation = this.changeLocation.bind(this);
        this.flick = this.flick.bind(this);
        this.update = this.update.bind(this);
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
        let id = ls('user.id');
        this.props.dispatch(fetchUserInfo(id));
    }
    changeLocation(location){
        let id = ls('user.id');
        this.props.dispatch(changeLocation(id,location)).then(() => {
            browserHistory.push('/');
            browserHistory.push('/profile');
        })
    }
    update(name,email,work,education){
        this.props.dispatch(editUser({name,email,work,education},ls('user.id'))).then(()=> {
            browserHistory.push('/');
            browserHistory.push('/profile');
        })
    }
    flick(){
        this.setState({change: !this.state.change});
    }
    render() {
        let chl;
        if(this.state.change){
            chl = <EditUser email={this.props.user.email} name={this.props.user.name} work={this.props.user.work} education={this.props.user.education} update={this.update} header="Edit User"/>;
        }
        let years = '';
        if(this.props.user.birthday){
            let array = moment(this.props.user.birthday).fromNow().split(' ');
            years = <h4>{array[0] + ' ' + array[1] + ' old'}</h4>;
        }
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
                <button className="btn" onClick={this.flick}>Edit User</button>
            </div>
            <br/>
            <br/>
            {chl}
        </div>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user
    };
})(Profile);