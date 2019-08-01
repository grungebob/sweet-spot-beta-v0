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
  
      if ((msecs - this.state.msecsPrev) > 1000)
        {
        this.setState({
          count:0
        })
        }
      if (this.state.count === 0)
        {
        this.setState({
          msecsFirst: msecs
        });
        this.setState({
          count: 1
        })
        }
      else
        {
        const bpmAvg = 60000 * this.state.count / (msecs - this.state.msecsFirst);
        const bpmWhole = Math.round(bpmAvg);
        this.setState({
          count: this.state.count + 1
        })
        /*
        this.setState({
          bpm: bpmWhole
        });
        \*/
        this.props.setBpm(bpmWhole);
        console.log('PROPS: ', this.props);
        }
        // this.state.msecsPrev = msecs;
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