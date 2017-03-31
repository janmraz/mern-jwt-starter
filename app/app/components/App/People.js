import React from 'react';
import { connect } from 'react-redux';
import { getPeopleInMyHotel } from '../../actions/actions_people';
import { fetchUserInfo } from '../../actions/actions_user';
import ChangeLocation from './ChangeLocation';
const ls = require('local-storage');
const moment = require('moment');

// components
import Alert from '../shared/Alert.js';


class Profile extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
        let id = ls('user.id');
        this.props.dispatch(getPeopleInMyHotel(id));
    }
    render() {
        let _this = this;
        let list = <h2>Loading...</h2>;
        console.log(!!_this.props.people.length);
        console.log(!_this.props.people || !!_this.props.people.length);
        if(!_this.props.people || !!_this.props.people.length){
            list = <div className="list-group"> {_this.props.people.map(function(person, i){
                return <a href={'/app/user/'+person.facebookId} className="list-group-item" key={i}>{person.name}</a>;
            })} </div>;
        }else{
            list = <h2>No person in your location</h2>
        }
        return (
            <div>
                <div className="container text-center">
                    <Alert />
                    <h3>People in your location</h3>
                    {list}
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        people: state.people
    };
})(Profile);