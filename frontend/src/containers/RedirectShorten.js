import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/index';

const RedirectShorten = (props) => {
    const details = useSelector(state => state.shorten);
    const { url } = details;

    const dispatch = useDispatch();

    useEffect(() => {
        const { match: { params } } = props;
        dispatch(actions.RedirectUrl(params));
        return () => {

        };
    }, [])

    useEffect(() => {
        if (url.originalUrl) {
            window.location = url.originalUrl;
        }
    })

    return (
        <section>Redirecting...</section>
    )
}

export default RedirectShorten;