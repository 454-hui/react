import React from 'react';
import ReactDOM from 'react-dom'
import RouterApp from './components/Router';
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom';
import store from './store'
ReactDOM.render(
    <Router>
    <Provider store={store}>
            <RouterApp />
    </Provider>
    </Router>
    ,
    document.getElementById('root')
)   