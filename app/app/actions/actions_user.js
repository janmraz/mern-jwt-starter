import axios from 'axios';

// action types
import { USER_LOGGED_IN, USER_LOGGED_OUT, FETCH_USER,GET_USER, CHANGE_LOCATION,CHANGE_SEARCH,EDIT_USER,DELETE_USER } from './types';

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
export function deleteUser(id) {
    return function(dispatch) {
        return axios.post('/api/user/delete', {id})
            .then((response) => {
                dispatch({
                    type: DELETE_USER
                });
            })
            .catch((err) => {
                console.error("ERR",err);
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
                console.error("ERR",err);
            });
    };
}
// Log out user and remove user info from state
export function editUser(data,id) {
    return function(dispatch) {
        return axios.post('/api/user/edit', {data, id})
            .then((response) => {
                dispatch({
                    type: EDIT_USER,
                    payload: response.data
                });
            })
            .catch((err) => {
                console.error("ERR",err);
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
                console.error("ERR",err);
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
                console.error("ERR",err);
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
                console.error("ERR",err);
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
