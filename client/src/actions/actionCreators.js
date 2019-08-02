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

export const setTracks = (artist, tracks) => {
    console.log("ACTION CREATORS setArtist ", artist)
    return {
        type: 'SET_TRACKS',
        artist,
        tracks
    }
}