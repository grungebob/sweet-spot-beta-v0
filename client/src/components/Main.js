import React, { Component } from 'react';
import '../App.css';
import MoodSelect from './MoodSelect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators'
import App from '../App';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: null,
      items: [],
      searchTerm: '',
      searchResults: [],
      artistTracks: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  searchForAnArtist = async (name) => {
    // console.log('SEARCHING FOR: ', name);
    const response = await fetch('/artistSearch', {
      method: 'POST',
      body: JSON.stringify({
        artist: name
      }),
      headers: {"Content-Type": "application/json"}
    });
    const body = await response.json();
    // console.log('BODY: ', body);
    this.setState({
      searchResults: body
    });
  }

  onChange (e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  onKeyPress (e) {
    if (e.key === 'Enter') {
      this.searchForAnArtist(this.state.searchTerm)
      this.setState({
        searchTerm: ''
      });
    }
  }

  findTracks = async (artist) => {
    let allTracks = [];
    const response = await fetch('/findAlbums', {
      method: 'POST',
      body: JSON.stringify({
        artist: artist
      }),
      headers: {"Content-Type": "application/json"}
    });
    const albums = await response.json();
    // console.log('Albums', albums);
    // for (let album in albums){
    //     // console.log('SEARCHING: ', albums[album])
    //     const response = await fetch('/findAlbumTracks', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         album: albums[album].id
    //       }),
    //       headers: {"Content-Type": "application/json"}
    //     });
    //     const albumResponse = await response.json();
    //     allTracks = allTracks.concat(albumResponse);
    // }

   const promises = await Promise.all(albums.map(album => fetch('/findAlbumTracks', {
    method: 'POST',
    body: JSON.stringify({
      album: album.id
    }),
    headers: {"Content-Type": "application/json"}
  })));

   allTracks = [].concat(...await Promise.all(promises.map(data => data.json())));
   
    const resRelatedArtists = await fetch('/findRelatedArtists', {
      method: 'POST',
      body: JSON.stringify({
        artist: artist
      }),
      headers: {"Content-Type": "application/json"}
    })
    const relatedArtists = await resRelatedArtists.json();
    for (let relatedArtist in relatedArtists) {
      const resRelatedTracks = await fetch('/findTopTracks', {
        method: 'POST',
        body: JSON.stringify({
          artist: relatedArtists[relatedArtist]
        }),
        headers: {"Content-Type": "application/json"}
      })
      const relatedTracks = await resRelatedTracks.json();
      allTracks = allTracks.concat(relatedTracks);
    }
    // console.log('ALL TRACKS', allTracks);
    this.setState({
      artistTracks: allTracks
    })

    const resAudioFeatures = await fetch('/multipleFeatures', {
      method: 'POST',
      body: JSON.stringify({
        tracks: this.state.artistTracks
      }),
      headers: {"Content-Type": "application/json"}
    });
    const audioFeatures = await resAudioFeatures.json()
    console.log('AUDIO FEATURES ARRAY: ', audioFeatures);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sweet Spot</h1>
        </header>
        <div className="App-body">
          <MoodSelect />
          <input type="text" placeholder="Enter Artist Name" value={this.state.searchTerm} onChange={this.onChange} onKeyPress = {this.onKeyPress}/>
          <div className='Artist-list'>
            {this.state.searchResults.map((artist) => 
              <div className="Single-artist" onClick={()=> this.findTracks(artist)}>
                {artist.images[2] ? <img src={artist.images[2].url} alt= {artist.name}  height = '50vh'/> : ''}
                <span> {artist.name} </span>
              </div>
            )}
          </div>
         
        </div>
      </div> 
    );
  }
}

export default Main;