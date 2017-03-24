import axios from 'axios';

// action types
import { USER_LOGGED_IN, USER_LOGGED_OUT, NEW_ALERT } from './types';

// ----- THUNK ACTION CREATORS ------

// Log out user and remove user info from state
export function logOutUser() {
    return function (dispatch) {
        return dispatch({
                    type: USER_LOGGED_OUT
                });
    };
}

// Log out user and remove user info from state
export function logInUser(data) {
    return function(dispatch) {
        return axios.post('/api/user/signin', data)
            .then((response) => {
                dispatch({
                    type: USER_LOGGED_IN,
                    payload: data
                });
            })
            .catch((err) => {
                throw new Error("User not found",err);
            });
    };
}

// Fetch user info to state
export function fetchUserInfo() {
    return function(dispatch) {
        axios.get('/api/user/info')
            .then((response) => {
                dispatch({
                    type: FETCH_USER,
                    payload: response.data
                });
            })
            .catch(() => {
                throw new Error("User not found");
            });
    };
}
