import * as actionTypes from '../actions/actionTypes';


const initialState = {
    messages: [],
    emoji: 0
};

const messages = (state = [], action) => {
    switch (action.type) {
        case 'EMOJI':
            return {
                ...state,
                emoji: action.payload,
            }
        case 'ADD_MESSAGE':
        case 'MESSAGE_RECEIVED':
            return {
                ...state, 
                messages: [...state.messages, action.payload]
            };
        case 'REMOVE_MESSAGE':
            return {
                ...state, 
                messages: [action.payload]
            };
        default:
            return state;
    }
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMOJI: return '6787';
        case actionTypes.ADD_MESSAGE: return messages(state, action);
        case actionTypes.MESSAGE_RECEIVED: return messages(state, action);
        case actionTypes.REMOVE_MESSAGE: return messages(state, action);
        default: return state;
    }
};

export default reducer;