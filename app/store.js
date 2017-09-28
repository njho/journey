import {applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import common from './Reducers/common.js';
import auth from './Reducers/auth.js';

const reducer = combineReducers({
    common,
    auth
});

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, middleware);

export default store;