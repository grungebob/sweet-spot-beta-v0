function step (state = {}, action) {
    // console.log('STEP ACTION: ', action);
    switch(action.type) {
        case 'SET_STEP' :
            return action.step
        default:
            return state;
    }
} 

export default step;