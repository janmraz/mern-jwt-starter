import React from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, changeLocation } from '../../actions/actions_user';
import ChangeLocation from './ChangeLocation';
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
    flick(){
        console.log('flick',this.state.change);
        this.setState({change: !this.state.change});
    }
    render() {
        let chl;
        if(this.state.change){
            console.log('state location');
            chl = <ChangeLocation changeLocation={this.changeLocation} header="Change location"/>;
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
                <button className="btn" onClick={this.flick}>Change Location</button>
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