import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from './app';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import { Provider }from 'react-redux';
import * as io from 'socket.io-client';
import {getSocket} from './socket';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
const socket =io.connect();

let elem;

console.log(App);

if (location.pathname == '/welcome') {
    elem = <Welcome />;
} else {
    elem = (
        getSocket(store),
        < Provider store = {store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector('main'));
