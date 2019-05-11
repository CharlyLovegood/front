import * as actionTypes from '../actions/actionTypes';
import { List, Map, toJS } from 'immutable';

const initialState = List()

const messages = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
        case 'MESSAGE_RECEIVED':
            return state.push(action.payload);
        case 'REMOVE_MESSAGE':
            return List();
        default:
            return state;
    }
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MESSAGE: return messages(state, action);
        case actionTypes.MESSAGE_RECEIVED: return messages(state, action);
        case actionTypes.REMOVE_MESSAGE: return messages(state, action);
        default: return state;
    }
};

export default reducer;