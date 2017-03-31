import { GET_PEERS } from '../actions/types.js';


export default function(state = {}, { type, payload }) {
    if (type === GET_PEERS) {
        return payload;
    }
    return state;
}

