import React from 'react';

/* QUESTION: How do these calls know to hit express if no package is imported on this component??
    Answer: once express server is up, it's like any other server.
    fetch is understood by the browser

*/

class ArtistSelect extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          searchTerm: '',
          searchResults: [],
          artistTracks: [],
          artist: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
      }

      searchForAnArtist = async (name) => {
        const response = await fetch('/artistSearch', {
          method: 'POST',
          body: JSON.stringify({
            artist: name
          }),
          headers: {"Content-Type": "application/json"}
        });
        const body = await response.json();
        this.setState({
          searchResults: body
        });
      }
    
      onChange (e) {
        // console.log('PROPS: ', this.props);
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
          this.setState({
              artist: artist.name
          })

        let allTracks = [];
        const response = await fetch('/findAlbums', {
          method: 'POST',
          body: JSON.stringify({
            artist: artist
          }),
          headers: {"Content-Type": "application/json"}
        });
        const albums = await response.json();
    
    
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
        this.props.setTracks(this.state.artist, audioFeatures, this.props.mood.selectedMood, this.props.bpm.bpm);
      }
    
      render() {
        return (
            <div className="App-body">
              <h2>Select artist(s) you like: {this.state.artist}</h2>
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
        );
      }
    }

export default ArtistSelect;