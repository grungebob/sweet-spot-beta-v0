function mood(state = [], action){
    switch(action.type) {
        case 'SET_MOOD' :
            return {
                ...state,
                desiredMood: action.mood
            }
        default:
            return state;
    }
}

export default mood;