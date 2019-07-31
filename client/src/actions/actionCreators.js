export const selectMood = (mood) => {
    return {
        type: 'SELECT_MOOD',
        mood
    }
}