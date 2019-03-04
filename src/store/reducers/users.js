import * as actionTypes from '../actions/actionTypes';


const initialState = {
  users: [],
  currentUser: []
};

const users = (state = [], action) => {
  console.log('adduser')
  
  switch (action.type) {
    
    case 'USERS_LIST':
      return {
        ...state, 
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
};


const currentUser = (state = [], action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      console.log('here')
      return {
        ...state, 
        currentUser: action.payload
      };
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
