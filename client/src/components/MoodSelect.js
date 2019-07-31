import React from 'react';
import '../App.css';

const MoodSelect = (props) => {
        return (
            <div>
                <div className="flexcontainer">
                 <div onClick={()=>{props.selectMood('relaxed')}}>Relaxed</div>
                 <div onClick={()=>{props.selectMood('cheerful')}}>Cheerful</div>
                 <div onClick={()=>{props.selectMood('dancey')}}>Dancey</div>
                </div>
                <div className="flexcontainer">
                    <div onClick={()=>{props.selectMood('calm')}}>Calm</div>
                    <div onClick={()=>{props.selectMood('neutral')}}>Neutral</div>
                    <div onClick={()=>{props.selectMood('energetic')}}>Energetic</div>
                </div>
                <div className="flexcontainer">
                    <div onClick={()=>{props.selectMood('deep')}}>Deep Thought</div>
                    <div onClick={()=>{props.selectMood('serious')}}>Serious</div>
                    <div onClick={()=>{props.selectMood('workout')}}>Work Out</div>
                </div>
            </div>
        )
    };

export default MoodSelect;
