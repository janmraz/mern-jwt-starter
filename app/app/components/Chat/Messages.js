import React from 'react';

import Message from './Message';

class Messages extends React.Component {
    componentDidUpdate() {
        // There is a new message in the state, scroll to bottom of list
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        // Loop through all the messages in the state and create a Message component
        let messages;
        if(Array.isArray(this.props.messages)){
        messages = this.props.messages.map((message, i) => {
            let fromMe = message.user == this.props.user;
            return (
                <Message
                    key={i}
                    username={message.username}
                    message={message.message}
                    time={message.time}
                    fromMe={fromMe} />
            );
        });
        }

        return (
            <div className='messages' id='messageList'>
                { messages }
            </div>
        );
    }
}

Messages.defaultProps = {
    messages: []
};

export default Messages;
