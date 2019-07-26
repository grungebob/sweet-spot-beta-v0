function setTracks(state = [], action){
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

export default setTracks;