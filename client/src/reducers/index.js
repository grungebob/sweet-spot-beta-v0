import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import mood from './mood';
import bpm from './bpm';
import tracks from './tracks';
import step from './step';


const rootReducer = combineReducers({mood, bpm, tracks, step, routing: routerReducer});

export default rootReducer;
