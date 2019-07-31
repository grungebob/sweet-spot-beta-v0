import React from 'react';

class HeartRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bpm: 0,
          count: 0,
          msecsFirst: 0,
          msecsPrev: 0
        }
        this.calcBpm = this.calcBpm.bind(this);
      }
  
    calcBpm(e) {
      var timeSeconds = new Date;
      var msecs = timeSeconds.getTime();
  
      if ((msecs - this.state.msecsPrev) > 1000)
        {
        this.state.count = 0;
        }
      if (this.state.count == 0)
        {
        this.state.msecsFirst = msecs;
        this.state.count = 1;
        }
      else
        {
        var bpmAvg = 60000 * this.state.count / (msecs - this.state.msecsFirst);
        var bpmVal = Math.round(bpmAvg * 100) / 100;
        var bpmWhole = Math.round(bpmAvg);
        this.state.count++;
        this.setState({
          bpm: bpmWhole
        });
        }
        this.state.msecsPrev = msecs;
      
    }
  
    render() {
      return (
        <div>
          <h3>Heart Rate: {this.state.bpm} BPM</h3>
          <h4>Tap the logo to the beat of your pulse</h4>
          <div id="logo">
          <img class="logo" src="url.png" onClick={this.calcBpm} />
          </div>
        </div>
        )
      }
  }
  
  export default HeartRate;