import * as actionTypes from '../actions/actionTypes';
import { List, toJS } from 'immutable';

const initialState = List()

const chats = (state = initialState, action) => {
    switch (action.type) {
        case 'CHAT_LIST':
            return state.push(action.payload);
        default:
            return state;
    }
};




const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHAT_LIST: return chats(state, action);
        default: return state;
    }
};

export default reducer;