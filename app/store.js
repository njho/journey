import {applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import common from './Reducers/common.js';
import auth from './Reducers/auth.js';
import communityReducer from './Reducers/communityReducer';
import locationReducer from './Reducers/locationReducer';

const reducer = combineReducers({
    common,
    auth,
    communityReducer,
    locationReducer
});

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, middleware);

export default store;