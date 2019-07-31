import React from 'react';
import '../App.css';

const MoodSelect = (props) => {
    // console.log(this.props);
        return (
            <div>
                <div className="flexcontainer">
                 <div onClick={()=> console.log(this.props)}>Relaxed</div>
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
