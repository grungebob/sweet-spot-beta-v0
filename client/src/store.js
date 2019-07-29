import { createStore,  } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

// Import the Root Reducer
import rootReducer from './reducers/index';

// New History to accomodate changes to Redux:
const browserHistory = createBrowserHistory();

// Create an object for the default data
const defaultState = {
    desiredMood: '',
    bpm: 100,
    search1Term: '',
    search1Results: [],
    artist1Tracks: [],
    search2Term: '',
    search2Results: [],
    artist2Tracks: [],
    search3Term: '',
    search3Results: [],
    artist3Tracks: [],
    finalPlaylist: [],
}

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(browserHistory, store);

export default store;