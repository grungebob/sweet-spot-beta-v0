import React from 'react';

import { render } from 'react-dom';

// Import Components
import App from './App'

// Import React Router Dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';


const router = (
    <Provider store={store}>
        <Router history={history}>
            <IndexRoute component={App}>
            </IndexRoute>
            <Route path="/" component={App}>
            </Route>
        </Router>
    </Provider>
)

render(router, document.getElementById('root'));