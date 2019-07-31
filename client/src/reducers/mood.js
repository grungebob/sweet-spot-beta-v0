function mood(state = {}, action){
    switch(action.type) {
        case 'SELECT_MOOD' :
            console.log('SELECTING MOOD');
            return {
                ...state,
                mood: action.mood
            }
        default:
            return state;
    }
}

export default mood;