import { createStore,  } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

// Import the Root Reducer
import rootReducer from './reducers/index';

// New History to accomodate changes to Redux:
const browserHistory = createBrowserHistory();

// Create an object for the default data
const defaultState = {
    mood: '',
    bpm: '',
    tracks: [],
    step: 1,
}

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(browserHistory, store);

export default store;