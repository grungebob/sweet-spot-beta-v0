export const moodFilter = (selectedMood, tracks = [], heartRate) => {
    // console.log('moodFilter ARGUMENTS: ', selectedMood, tracks, heartRate);
    // console.log('MOOD OBJ: ', moods[selectedMood])
    return tracks.filter(track => {
        if (track) {
            const { energy } = moods[selectedMood];
            return energy.operator === 'greater' ?
                track.energy > energy.value 
                    : track.energy < energy.value 
            } else {
                return false;
            }
        } 
    ).filter(track => {
        if (track) {
            const { bpm } = moods[selectedMood];
            return bpm.operator === 'greater' ?
            track.tempo >= heartRate 
                : track.tempo <= heartRate
        } else {
            return false;
        }
    }).sort((track1, track2) =>  {
        return track1.tempo - track2.tempo
    })
}

const moods = {
    energetic: {
        energy: {
            operator: 'greater',
            value: .8
        },
        bpm: {
            operator: 'greater'
        }
    },
    dancey: {
        energy: {
            operator: 'greater',
            value: .8
        },
        bpm: {
            operator: 'greater'
        }
    },
    workout: {
        energy: {
            operator: 'greater',
            value: .8
        },
        bpm: {
            operator: 'greater'
        }
    },
    relaxed: {
        energy: {
            operator: 'lesser',
            value: .3
        },
        bpm: {
            operator: 'lesser',
        }
    },
    calm: {
        energy: {
            operator: 'lesser',
            value: .3
        },
        bpm: {
            operator: 'lesser',
        }
    },
    deep: {
        energy: {
            operator: 'lesser',
            value: .3
        },
        bpm: {
            operator: 'lesser',
        }
    }
}