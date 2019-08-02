import { moodFilter } from '../moodFilter';

function tracks(state = [], action){
    // console.log('TRACKS REDUCER: ', action);
    // console.log("STATE: ", state);

    //Call states


    switch(action.type) {
        case 'SET_TRACKS' : 
        const filteredTracks = moodFilter(action.mood, action.tracks, action.heartRate); // Action.payload Heartrate and mood from state
        return filteredTracks;
            // return filteredTracks

            
        default:
            return state;
    }
}

export default tracks;