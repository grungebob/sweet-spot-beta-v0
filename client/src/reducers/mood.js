//QUESTION: why does state need to have a default?
// A: The functionality, could do a conditional for undefineds or nulls

function mood(state ={}, action){
    switch(action.type) {
        case 'SELECT_MOOD' :
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

/*Clint Demo:
const reducer = {
    'SELECT_MOOD': (state, mood) => {
        return {
            ...state,
            selectedMood: mood,
        }
    }
}

function runReducer (state, action) {
    return reducer[action.type](state, action.payload)
}
*/