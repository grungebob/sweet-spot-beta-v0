import React from 'react';

const Track = (props) => {
    const url = "https://open.spotify.com/track/" + props.id
    return (
        <div>
            <div>
                <a href={url}>{props.id}</a> 
            </div>
            <div>
                Tempo: {Math.round(props.tempo)}
            </div>
        </div>
    );
}

export default Track;