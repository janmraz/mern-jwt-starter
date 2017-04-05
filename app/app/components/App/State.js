import React from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, changeLocation,changeSearch } from '../../actions/actions_user';
import ChangeAction from './ChangeAction';
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
    changeLocation(location,startDate,endDate){
        let id = ls('user.id');
        this.props.dispatch(changeLocation(id,location,startDate,endDate)).then(() => {
            browserHistory.push('/');
            browserHistory.push('/state');
        })
    }
    changeSearch(search,startDate,endDate){
        let id = ls('user.id');
        this.props.dispatch(changeSearch(id,search,startDate,endDate)).then(() => {
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
        let location = this.props.user.location ? this.props.user.location : '-';
        let search = this.props.user.search ? this.props.user.search : '-';
        let startDate = this.props.user.startDate ? this.props.user.startDate : moment().unix();
        let endDate = this.props.user.endDate ? this.props.user.endDate : moment().unix();
        let startDateSearch = this.props.user.startDateSearch ? this.props.user.startDateSearch : moment().unix();
        let endDateSearch = this.props.user.endDateSearch ? this.props.user.endDateSearch : moment().unix();
        let changeLocation = this.state.location ? <ChangeAction changeLocation={this.changeLocation} location={location} startDate={startDate} endDate={endDate} header="Change location"/> :'';
        let changeSearch = this.state.search ? <ChangeAction changeLocation={this.changeSearch} location={search} startDate={startDateSearch} endDate={endDateSearch} header="Change search query"/> : '';
        return (
            <div>
                <div className="container text-center">
                    <Alert />
                    <p>State</p>
                    <h3>My location</h3>
                    <h4>Your location: {location}</h4>
                    <h4>From {moment.unix(startDate).format("MM/DD/YYYY")} to {moment.unix(endDate).format("MM/DD/YYYY")}</h4>
                    <h3>I search for...</h3>
                    <h4>Location you search: {search}</h4>
                    <h4>From {moment.unix(startDateSearch).format("MM/DD/YYYY")} to {moment.unix(endDateSearch).format("MM/DD/YYYY")}</h4>
                    <button className="btn btn-primary" onClick={() => {this.flick('location')}}>Change Location</button>
                    &nbsp;
                    <button className="btn btn-default" onClick={() => {this.flick('search')}}>Change Search</button>
                </div>
                <br/>
                <br/>
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