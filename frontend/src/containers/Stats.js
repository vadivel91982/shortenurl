import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/index';

const Stats = (props) => {
    const details = useSelector(state => state.shorten);
    const { allUrl } = details;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getAll());
        return () => {

        };
    }, [])

    return (
        <div className="page-title">
            <div className="container-fluid">
                <h2>Analytics</h2>
                <ul className="list-links right">
                    {allUrl.map((item) => {
                        return <li key={item.id}>
                            <h2>{item.originalUrl}</h2>
                            <h4>{item.shortUrl}</h4>
                            <p>Total clicks: {item.clickCount}</p>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Stats;