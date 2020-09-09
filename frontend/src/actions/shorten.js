import axiosInstance from '../utils/axiosInstance';
import { GET_SHORTEN, CLEAR_SHORTEN, SHORTEN_ERROR, GET_STATS, REDIRECT } from './actionTypes';

export const getShortenUrl = (originalUrl) => async dispatch => {
    console.log('originalUrl', originalUrl)
    try {
        const res = await axiosInstance.post('/generate', originalUrl);
        console.log('action', res.data);
        dispatch({
            type: GET_SHORTEN,
            payload: res.data
        })
    } catch (err) {
        dispatch({ type: CLEAR_SHORTEN });
        dispatch({
            type: SHORTEN_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getAll = () => async dispatch => {
    try {
        const res = await axiosInstance.get('/stats');
        dispatch({
            type: GET_STATS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({ type: CLEAR_SHORTEN });
        dispatch({
            type: SHORTEN_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const RedirectUrl = (params) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/${params.urlCode}`);
        dispatch({
            type: REDIRECT,
            payload: res.data
        })
    } catch (err) {
        dispatch({ type: CLEAR_SHORTEN });
        dispatch({
            type: SHORTEN_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
