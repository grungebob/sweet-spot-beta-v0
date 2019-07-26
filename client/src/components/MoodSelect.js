import React from 'react';
import createReactClass from 'create-react-class'
import '../App.css';

const MoodSelect = () => {

        return (
            <div>
                <div className="flexcontainer">
                 <div>Relaxed</div>
                 <div>Cheerful</div>
                 <div>Dancey</div>
                </div>
                <div className="flexcontainer">
                    <div>Calm</div>
                    <div>Neutral</div>
                    <div>Energetic</div>
                </div>
                <div className="flexcontainer">
                    <div>Deep Thought</div>
                    <div>Serious</div>
                    <div>Work Out</div>
                </div>
            </div>
        )
    };

export default MoodSelect;
