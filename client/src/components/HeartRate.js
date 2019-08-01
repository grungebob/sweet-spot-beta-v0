import React from 'react';
import heart from './heart.svg'

class HeartRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bpm: '',
          count: 0,
          msecsFirst: 0,
          msecsPrev: 0
        }
        this.calcBpm = this.calcBpm.bind(this);
        this.onChange = this.onChange.bind(this);
      }

    calcBpm(e) {
      const timeSeconds = new Date();
      const msecs = timeSeconds.getTime();

      console.log('TIME SECS: ', timeSeconds);
      console.log('MSECS: ', msecs);
      console.log('Difference: ', msecs - this.state.msecsPrev);
      console.log('COUNT: ', this.state.count);
      console.log('GREATER THAN 1000? : ', (msecs - this.state.msecsPrev) > 1000);
  
      if ((msecs - this.state.msecsPrev) > 1000){
          console.log('RESET COUNT? BEFORE: ', this.state.count);
          /* QUESTION:  this.state.count = works, but not setState??????
          this.state.count = 0;*/
          this.state.count = 0;
          console.log('RESET, COUNT? AFTER:', this.state.count);
        }
      if (this.state.count === 0){
        console.log('FIRST ')
        this.setState({
          msecsFirst: msecs
        });
          this.setState({
            count: 1
          })
        }
      else {
        const bpmAvg = 60000 * this.state.count / (msecs - this.state.msecsFirst);
        const bpmWhole = Math.round(bpmAvg);
        this.setState({
          count: this.state.count + 1
        })
        this.props.setBpm(bpmWhole);
        console.log('PROPS: ', this.props);
        }
        this.setState({
          msecsPrev: msecs
        })
      
    }

    onChange (e) {
      console.log('HEART RATE PROPS: ', this.props);
      this.props.setBpm(e.target.value);
    }
  
    render() {
      return (
        <div>
          <h2>Enter your heart rate or tap the heart to the beat of your pulse:</h2>
          <h3>Heart Rate: {this.props.bpm.bpm} BPM</h3>
          <input type="text" placeholder="Heart Rate (e.g. 104)" value={this.props.bpm.bpm} onChange={this.onChange} />
          <div onClick={this.calcBpm}>
                <img src={heart} className="heart-logo" alt="heart"/>
          </div>
        </div>
        )
      }
  }
  
  export default HeartRate;