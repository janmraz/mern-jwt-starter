import axios from 'axios';

// action types
import { GET_MESSAGES,SEND_MESSAGE,GET_PEERS } from './types';


export function getMessages(id,userid) {
    return function(dispatch) {
        return axios.get('/api/user/messages?id=' + id + '&userid=' + userid)
            .then((response) => {
                console.log(response.data);
                dispatch({
                    type: GET_MESSAGES,
                    payload: response.data
                });
            })
            .catch((err) => {
                console.error("ERR",err);
            });
    };
}
export function getChatPeers(id) {
    return function(dispatch) {
        return axios.get('/api/user/peers?id=' + id)
            .then((response) => {
                dispatch({
                    type: GET_PEERS,
                    payload: response.data
                });
            })
            .catch((err) => {
                console.error("ERR",err);
            });
    };
}

export function addMessage(message) {
    return function(dispatch) {
        return dispatch({
            type: SEND_MESSAGE,
            payload: message
        });
    };
}


