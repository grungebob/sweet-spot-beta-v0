//QUESTION: why does state need to have a default?

function mood(state = {}, action){
    switch(action.type) {
        case 'SELECT_MOOD' :
            console.log('SELECTING MOOD STATE: ', state);
            console.log('SELECTING MOOD ACTION: ', action);

            return {
                ...state,
                mood: action.mood
            }
        default:
            return state;
    }
}

export default mood;