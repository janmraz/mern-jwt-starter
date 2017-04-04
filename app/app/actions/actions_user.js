import axios from 'axios';

// action types
import { USER_LOGGED_IN, USER_LOGGED_OUT, FETCH_USER,GET_USER, CHANGE_LOCATION,CHANGE_SEARCH } from './types';

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
export function fetchUserInfo(id) {
    return function(dispatch) {
        return axios.get('/api/user/info?id=' + id)
            .then((response) => {
            console.log(response.data);
                dispatch({
                    type: GET_USER,
                    payload: response.data
                });
            })
            .catch(() => {
                throw new Error("User not found");
            });
    };
}
// Fetch user info to state
export function detailUserInfo(id) {
    return function(dispatch) {
        return axios.get('/api/user/info?id=' + id)
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
// Change Location
export function changeLocation(id,location,startDate,endDate) {
    return function(dispatch) {
        console.log('date',startDate,endDate);
        return axios.post('/api/user/location', {id,location,startDate,endDate})
            .then((response) => {
                dispatch({
                    type: CHANGE_LOCATION,
                    payload: response.data
                });
            })
            .catch(() => {
                throw new Error("User not found");
            });
    };
}
// Change Search
export function changeSearch(id,search,startDate,endDate) {
    return function(dispatch) {
        return axios.post('/api/user/search', {id,search,startDate,endDate})
            .then((response) => {
                dispatch({
                    type: CHANGE_SEARCH,
                    payload: response.data
                });
            })
            .catch(() => {
                throw new Error("User not found");
            });
    };
}
