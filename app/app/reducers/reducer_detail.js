import { FETCH_USER } from '../actions/types.js';


export default function(state = {}, { type, payload }) {
    if (type === FETCH_USER) {
        return payload.data;
    }
    return state;
}

