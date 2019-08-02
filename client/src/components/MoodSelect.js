import React from 'react';

const MoodSelect = (props) => {
    // QUESTION: WHY is it in props.mood.mood?
    // console.log('MOOD SELECT PROPS: ', props);
        return (
            <div>
                <h2>Select your desired mood: {props.mood.selectedMood}</h2>
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
