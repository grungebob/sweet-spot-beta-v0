import React from 'react';
import Track from './Track'

const Playlist = (props) => {
    return (
        <div>
            {props.tracks.map(track => 
                <Track key = {track.id} id = {track.id} tempo = {track.tempo} /> 
            )}
        </div>
    );
}

export default Playlist;