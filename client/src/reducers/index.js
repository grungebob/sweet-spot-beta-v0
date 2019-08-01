import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import mood from './mood';
import bpm from './bpm';
import tracks from './tracks';


const rootReducer = combineReducers({mood, bpm, tracks, routing: routerReducer});

export default rootReducer;
