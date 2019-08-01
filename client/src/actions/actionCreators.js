export const selectMood = (mood) => {
    return {
        type: 'SELECT_MOOD',
        mood
    }
}

export const setBpm = (bpm) => {
    return {
        type: 'SET_BPM',
        bpm
    }
}