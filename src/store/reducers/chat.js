import * as actionTypes from '../actions/actionTypes';


const initialState = {
    chats: []
};

const chats = (state = [], action) => {
    switch (action.type) {
        case 'CHAT_LIST':
            return {
                ...state, 
                chats: [...state.chats, action.payload]
            };
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