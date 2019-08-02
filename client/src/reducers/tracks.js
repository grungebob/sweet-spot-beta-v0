function tracks(state = [], action){
    console.log('TRACKS REDUCER: ', action);
    switch(action.type) {
        case 'SET_TRACKS' :
            return {
                ...state,
                [action.artist]: action.tracks
            }
        default:
            return state;
    }
}

export default tracks;