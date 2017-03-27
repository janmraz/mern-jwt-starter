import { GET_PEOPLE_BY_HOTEL } from '../actions/types.js';


export default function(state = {}, { type, payload }) {
    if (type === GET_PEOPLE_BY_HOTEL) {
        return payload;
    }
    return state;
}

