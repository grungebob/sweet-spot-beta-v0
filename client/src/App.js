import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: null,
      items: [],
      searchTerm: '',
      searchResults: [],
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
    console.log('SEARCHING FOR: ', name);
    const response = await fetch('/artistSearch', {
      method: 'POST',
      body: JSON.stringify({
        artist: name
      }),
      headers: {"Content-Type": "application/json"}
    });
    const body = await response.json();
    console.log('BODY: ', body);
    this.setState({
      searchResults: body
    });
  }

  onChange (e) {
    console.log(e.target.value);
    this.setState({
      searchTerm: e.target.value
    });
  }

  onKeyPress (e) {
    console.log('e key', e.key);
    if (e.key === 'Enter') {
      this.searchForAnArtist(this.state.searchTerm)
      console.log('ENTER: ', e);
      this.setState({
        searchTerm: ''
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sweet Spot</h1>
        </header>
        <p className="App-body">
          <input type="text" placeholder="Enter Artist Name" value={this.state.searchTerm} onChange={this.onChange} onKeyPress = {this.onKeyPress}/>
        
        {this.state.searchResults.map((artist) => 
          <div>
            <span>{artist.name}</span>
           {artist.images[2] ? <img src={artist.images[2].url} alt= {artist.name}  height = '50vh'/> : ''}
          </div>
          )}
      </p>
      </div>
    );
  }
}

export default App;