export default bpm = (state = {}, action)=> {
    switch(action.type) {
        case 'SET_BPM' :
            return {
                ...state,
                bpm: Number(action.bpm)
            }
        default:
            return state;
    }
} 