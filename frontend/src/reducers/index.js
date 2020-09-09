import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import shorten from './shorten';

export default combineReducers({
    routing: routerReducer,
    shorten
})