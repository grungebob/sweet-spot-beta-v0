import React from 'react';

const HeartRate = React.createClass({
    render() {
        return (
            <div>
                {this.props.bpm}
            </div>
        )
    }
})