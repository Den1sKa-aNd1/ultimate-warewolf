import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import AllReducers from './Reducers/AllReducers'
const DEBUG = process.env.NODE_ENV === 'development'

// Store - is a central place for the App that contains/Store the data
// this is the main (or only) source of truth. Don't worry much about the config
// It is usualy done once and for the whole life of the project
function configureStore(initialState = {}) {
    if (DEBUG) {
        return createStore(AllReducers, initialState, applyMiddleware(thunk, logger))
    } else {
        return createStore(AllReducers, initialState, applyMiddleware(thunk))
    }
}

const store = configureStore()

ReactDOM.render(<Provider store={store}>
    <App /></Provider>, document.getElementById('root'));