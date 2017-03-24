import {USER_LOGGED_OUT, USER_LOGGED_IN} from '../actions/types.js';
let ls = require('local-storage');
import { browserHistory } from 'react-router';


export default function(state = {}, { type, payload }) {
    if (type === USER_LOGGED_IN) {
        ls('token',payload.accessToken);
        return payload
    }
    if (type === USER_LOGGED_OUT) {
        ls('token',null);
        return {}
    }
    return state;
}

