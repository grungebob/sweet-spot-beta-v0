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


class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sweet Spot</h1>
        </header>
        <div className="App-body">
          <HeartRate {...this.props}/>
          <MoodSelect {...this.props}/>
          <ArtistSelect {...this.props}/>
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
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch);
  };
  

  export default compose(
    connect(mapStatetoProps, mapDispatchToProps))(App);