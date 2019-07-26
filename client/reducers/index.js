import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import mood from './mood';
import setTracks from './setTracks'

const rootReducer = combineReducers({mood, setTracks, routing: routerReducer});

export default rootReducer;
