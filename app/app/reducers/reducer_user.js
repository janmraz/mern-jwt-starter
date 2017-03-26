import {USER_LOGGED_OUT, USER_LOGGED_IN, GET_USER, CHANGE_LOCATION} from '../actions/types.js';
let ls = require('local-storage');


export default function(state = {}, { type, payload }) {
    if (type === USER_LOGGED_IN) {
        ls('token',payload.accessToken);
        ls('user.email',payload.email);
        ls('user.id',payload.id);
        return payload
    }
    if (type === USER_LOGGED_OUT) {
        ls('token',null);
        ls('user.email',null);
        ls('user.id',null);
        return {}
    }
    if(type === GET_USER){
        return payload.data
    }
    if(type === CHANGE_LOCATION){
        console.log('location',payload.data);
        return Object.assign({}, state, {
            location: payload.data
        })
    }
    return state;
}

