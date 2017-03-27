import axios from 'axios';

// action types
import { GET_PEOPLE_BY_HOTEL } from './types';



// Fetch user info to state
export function getPeopleInMyHotel(id,location) {
    return function(dispatch) {
        return axios.get('/api/user/hotel?id=' + id)
            .then((response) => {
                console.log(response.data);
                dispatch({
                    type: GET_PEOPLE_BY_HOTEL,
                    payload: response.data
                });
            })
            .catch((err) => {
                console.log(err);
                throw new Error("User not found");
            });
    };
}
