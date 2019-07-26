import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// Import the Root Reducer
import rootReducer from './reducers/index';

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

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;