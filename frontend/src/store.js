import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

// const loggerMiddleware = createLogger();

// const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    // initialState,
    composeEnhancer(
        applyMiddleware(
            thunk,
            // loggerMiddleware
        )
    )
);
export default store;