function bpm (state = [], action) {
    switch(action.type) {
        case 'SET_BPM' :
            // console.log('BPM ACTION: ', action);
            return {
                ...state,
                bpm: Number(action.bpm)
            }
        default:
            return state;
    }
} 

export default bpm;