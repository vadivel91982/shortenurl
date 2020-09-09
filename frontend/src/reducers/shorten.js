import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils/updateObject';

const initialState = {
    shortUrl: [],
    loading: false,
    allUrl: [],
    url: {}
};

const shortenUrl = (state, action) => {
    return updateObject(state, {
        shortUrl: action.payload,
        loading: false
    });
};

const getAllList = (state, action) => {
    return updateObject(state, {
        allUrl: action.payload,
        loading: false
    });
};

const redirectUrl = (state, action) => {
    return updateObject(state, {
        url: action.payload,
        loading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SHORTEN: return shortenUrl(state, action);
        case actionTypes.GET_STATS: return getAllList(state, action);
        case actionTypes.REDIRECT: return redirectUrl(state, action);
        default: return state;
    }
};

export default reducer;