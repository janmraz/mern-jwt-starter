import React from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../../actions/actions_user';
import { getChatPeers } from '../../actions/actions_messages';
import ChangeLocation from './ChangeAction';
import { browserHistory } from 'react-router';
const ls = require('local-storage');
const moment = require('moment');

// components
import Alert from '../shared/Alert.js';


class Chats extends React.Component {
    constructor(){
        super();
        this.state = {
            change: false
        }
    }
    componentDidMount(){
        let id = ls('user.id');
        this.props.dispatch(fetchUserInfo(id));
        this.props.dispatch(getChatPeers(id));
    }

    render() {
        let peers;
        if(Array.isArray(this.props.peers) && this.props.peers.length > 0){
            peers = <div className="list-group"> {this.props.peers.map((peer,i)=>{
                return <a href={'/app/chat/'+peer.facebookId} className="list-group-item" key={i}>{peer.name}</a>
            })}</div>
        }else{
            peers = <h2>You didn't start chat with anyone</h2>
        }
        return (
            <div>
                <div className="container text-center">
                    <Alert />
                    {peers}
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user,
        peers: state.peers,
    };
})(Chats);
