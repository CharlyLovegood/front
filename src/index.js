import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import messageReducer from './store/reducers/message';
import usersReducer from './store/reducers/users';
import chatReducer from './store/reducers/chat';

import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    msg: messageReducer,
    usr: usersReducer,
    cht: chatReducer 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

