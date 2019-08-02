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

export const setTracks = (artist, tracks, mood, heartRate) => {
    // console.log("ACTION CREATORS setTracks ", artist)
    return {
        type: 'SET_TRACKS',
        artist,
        tracks,
        mood,
        heartRate
    }
}

export const setStep = (step) => {
    // console.log('STEP: ', step);
    return {
        type: 'SET_STEP',
        step
    }
}