import React from 'react';
import { connect } from 'react-redux';
import { addMessage, getMessages } from '../../actions/actions_messages';
import { fetchUserInfo, detailUserInfo } from '../../actions/actions_user';
const ls = require('local-storage');
const moment = require('moment');

// components
import Alert from '../shared/Alert.js';
import Messages from './Messages';
import ChatInput from './ChatInput';


class Chat extends React.Component {
    constructor(){
        super();
        this.state = { messages: [] };
        this.sendHandler = this.sendHandler.bind(this);

        // Connect to the server
        this.socket = io('http://localhost:8080').connect();

        // Listen for messages from the server
        this.socket.on('server:message', message => {
            this.addMessage(message);
        });

    }
    componentDidMount(){
        let id = this.props.params.id;
        let yourid = ls('user.id');
        this.props.dispatch(fetchUserInfo(yourid));
        this.props.dispatch(detailUserInfo(id));
        this.props.dispatch(getMessages(id,yourid))
    }
    sendHandler(message) {
        let result = {};
        result.message = message;
        result.user = this.props.host.facebookId;
        result.recipient = this.props.user.facebookId;
        result.username = this.props.host.name;
        result.recipientname = this.props.user.name;
        result.time = new Date().getTime();
        this.props.dispatch(addMessage(result));

        // Emit the message to the server
        this.socket.emit('client:message', result);

        this.addMessage(result);
    }

    addMessage(message) {
        if(message.user === this.props.user.id && message.recipient === this.props.host.id){
            this.props.dispatch(addMessage(message));
        }
    }

    render() {
        return (
            <div>
                <div className="container-messages">
                    <Alert />
                    <h4 className="text-center">{this.props.user.name}</h4>
                    <Messages messages={this.props.messages} user={this.props.host.facebookId} />
                    <ChatInput onSend={this.sendHandler} />
                </div>
            </div>
        );
    }
}

export default connect((state)=>{
    return {
        host: state.user,
        user: state.detail,
        messages: state.messages
    }
})(Chat);
