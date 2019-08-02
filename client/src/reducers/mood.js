//QUESTION: why does state need to have a default?
// A: The functionality, could do a conditional for undefineds or nulls

function mood(state ={}, action){
    console.log('MOOD REDUCER: ', action);
    switch(action.type) {
        case 'SELECT_MOOD' :
            // console.log('SELECTING MOOD STATE: ', state);
            // console.log('SELECTING MOOD ACTION: ', action);

            return {
                //would need to put an if statement here if not there originally.
                ...state,
                selectedMood: action.mood
            }
        default:
            return state;
    }
}

export default mood;