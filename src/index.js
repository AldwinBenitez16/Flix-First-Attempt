// React imports
import React from 'react';
import ReactDOM from 'react-dom';

// JQuery
import 'jquery';

//Component & CSS
import Flix from './containers/Flix';
import * as serviceWorker from './serviceWorker';
import './css/index.css';

// Slick 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/slick.css';

// Redux import
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers/store';
const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

ReactDOM.render(
    <Provider store={store}>
            <Flix />
    </Provider>, 
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
