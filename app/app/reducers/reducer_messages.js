import { GET_MESSAGES, SEND_MESSAGE } from '../actions/types.js';


export default function(state = {}, { type, payload }) {
    if (type === GET_MESSAGES) {
        return payload;
    }
    if(type === SEND_MESSAGE){
        return Array.isArray(state) ? state.concat(payload) : [payload];
    }
    return state;
}

