import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as actionCreators from './actions/actionCreators'

/* Components: */
import HeartRate from './components/HeartRate';
import MoodSelect from './components/MoodSelect';
import ArtistSelect from './components/ArtistSelect';
import Playlist from './components/Playlist';
import Step from './components/Step/Step';
import Stepper from './components/Step/Stepper'


class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sweet Spot</h1>
          Music For Any Mood

        </header>
        <div className="App-body">
          <Stepper step = {this.props.step}>
            <Step >
               <HeartRate {...this.props}/>
               <MoodSelect {...this.props}/>
            </Step>
            <Step>
              <ArtistSelect {...this.props}/>
            </Step>
            <Step>
              <Playlist {...this.props}/>
            </Step>
          </Stepper>
        <div className="stepper" onClick = {() => this.props.setStep(this.props.step + 1)}> NEXT > </div>

        </div>
      </div> 
    );
  }
}

const mapStatetoProps = state => {
    return {
      mood: state.mood,
      bpm: state.bpm,
      tracks: state.tracks,
      step: state.step,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch);
  };
  

  export default compose(
    connect(mapStatetoProps, mapDispatchToProps))(App);