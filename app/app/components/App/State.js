import React from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, changeLocation,changeSearch } from '../../actions/actions_user';
import ChangeLocation from './ChangeLocation';
import { browserHistory } from 'react-router';
const ls = require('local-storage');
const moment = require('moment');

// components
import Alert from '../shared/Alert.js';


class State extends React.Component {
    constructor(){
        super();
        this.changeLocation = this.changeLocation.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.flick = this.flick.bind(this);
        this.state = {
            location: false,
            search: false
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
            browserHistory.push('/state');
        })
    }
    changeSearch(search){
        let id = ls('user.id');
        this.props.dispatch(changeSearch(id,search)).then(() => {
            browserHistory.push('/');
            browserHistory.push('/state');
        })
    }
    flick(param){
        if(param === 'location'){
            this.setState({location: !this.state.location,search: false});
        }
        if(param === 'search'){
            this.setState({search: !this.state.search,location: false});
        }
    }
    render() {
        let changeLocation = this.state.location ? <ChangeLocation changeLocation={this.changeLocation} header="Change location"/> :'';
        let changeSearch = this.state.search ? <ChangeLocation changeLocation={this.changeSearch} header="Change search query"/> : '';
        return (
            <div>
                <div className="container text-center">
                    <Alert />
                    <p>State</p>
                    <h3>My location</h3>
                    <h4>{this.props.user.location}</h4>
                    <h3>I search for...</h3>
                    <h4>{this.props.user.search}</h4>
                    <button className="btn btn-primary" onClick={() => {this.flick('location')}}>Change Location</button>
                    &nbsp;
                    <button className="btn btn-default" onClick={() => {this.flick('search')}}>Change Search</button>
                </div>
                <br/>
                <br/>
                {changeLocation}
                {changeSearch}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user
    };
})(State);