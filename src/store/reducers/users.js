import * as actionTypes from '../actions/actionTypes';
import { List, Map, toJS } from 'immutable';

const initialState = Map({
    users: List(),
    currentUser: [] 
})


const users = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_LIST':
            return state.update('users', (users) => users.push(action.payload));
        default:
            return state;
    }
};


const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case 'CURRENT_USER':
            return state.update('currentUser', (currentUser) => action.payload);
        default:
            return state;
    }
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERS_LIST: return users(state, action);
        case actionTypes.CURRENT_USER: return currentUser(state, action);
        default: return state;
    }
};

export default reducer;
