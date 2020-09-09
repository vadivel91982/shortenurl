import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Spinner from '../components/UI/Spinner/Spinner';

const Shorten = (props) => {
    const [submitted, setSubmitted] = useState(false);
    const [loadingList, setLoadingList] = useState(false);
    const { onShortenUrl, shortenUrl } = props;
    const [url, setUrl] = useState("");
    const [inputs, setInputs] = useState({
        originalUrl: ''
    });
    const { originalUrl } = inputs;
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleShortenurl = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (originalUrl) {
            setLoadingList(true);
            const data = {
                originalUrl: originalUrl
            }
            setUrl(<Spinner />)
            await onShortenUrl(data);

            if (!props.loading && loadingList) {
                setUrl(<li>{shortenUrl.shortUrl}</li>)
            }
        }
    }

    return (
        <div>
            <div className="container-fluid">
                <h2>Welcome to short.com</h2>
                <h4>Please enter your URL here</h4>
                <form name="form" onSubmit={handleShortenurl}>
                    <div className="form-group">
                        <input type="text" name="originalUrl" value={originalUrl} onChange={handleChange} className={'form-control'} style={{
                            borderColor: submitted && !originalUrl
                                ? 'red'
                                : '',
                            borderWidth: 1,
                        }} tabIndex="1" autoComplete="off" /><button className="btn btn-primary btn-sm">SHORTENURL</button>
                    </div>
                    <div><ul>{url}</ul></div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shortenUrl: state.shorten.shortUrl,
        loading: state.shorten.loading,
        error: state.shorten.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShortenUrl: (data) =>
            dispatch(actions.getShortenUrl(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shorten);