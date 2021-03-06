//Spotify Key

/*QUESTION: how can I import the spotify key from a different file?

DEFAULT EXPORTS DO NOT USE BRACKETS
BRACKETS WHEN IT'S NOT A DEFAULT

Node by default doesn't do import export syntax, need to install babel
But the react components understand it
*/
const  spot = require('./spotifyKey');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//Body Parser:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`ey bruv - listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'This is what is returned from /express_backend' });
});

app.post('/artistSearch', (req, res) => {
    const query = req.body.artist.replace(' ', '%20');
    spot
    .request('https://api.spotify.com/v1/search?q=' + query + '&type=artist')
        .then(response => {
          const returnedArtists = response.artists.items;
          let artists = [];
          for (artist in returnedArtists){
            artists.push(
              {
                id: returnedArtists[artist].id,
                images: returnedArtists[artist].images,
                name: returnedArtists[artist].name,
              }
            )
          }
          res.send(artists)
        })
})

app.post('/findAlbums', (req, res)=> {
  const artistId = req.body.artist.id;
  spot
  .request('https://api.spotify.com/v1/artists/' + artistId + '/albums?limit=50')
    .then(response => {
      // console.log('ARTIST ALBUMS', (response));
      let albums = [];
      for (let album in response.items) {
        albums.push({
          id: response.items[album].id,
          name: response.items[album].name
        })
      }
      // console.log('Albums Array', albums);
      res.send(albums);
    })
    .catch(e => console.error('ERROR: ', e));
})

app.post('/findAlbumTracks', (req, res)=> {
  // console.log('album id: ', req.body.album)
  const albumId = req.body.album;
  spot
  .request('https://api.spotify.com/v1/albums/' + albumId + '/tracks?limit=50')
    .then(response => {
      // console.log('ALBUM TRACKS: ', response);
      let tracks = [];
      for (let track in response.items) {
        tracks.push(response.items[track].id);
      }
      res.send(tracks);
    })
    .catch(e => console.error('ERROR: ', e));
})

app.post('/findRelatedArtists', (req, res) => {
  const artistId = req.body.artist.id;
  // console.log('ARTIST ID: ', artistId);
  spot
  .request('https://api.spotify.com/v1/artists/' + artistId + '/related-artists')
    .then(response => {
      // console.log('RESPONSE: ', response);
      let relatedArtists = [];
      for (artist in response.artists){
        // console.log('RELATED: ', response.artists[artist].id);
        relatedArtists.push(response.artists[artist].id);
        }
      res.send(relatedArtists);  
      }
    )
    .catch(e => console.error('ERROR: ', e));
})

app.post('/findTopTracks', (req, res) => {
  const artistId = req.body.artist;
  spot
  .request('https://api.spotify.com/v1/artists/'+ artistId + '/top-tracks?country=US')
    .then(response => {
      let relatedTracks = [];
      for (track in response.tracks) {
        relatedTracks.push(response.tracks[track].id);
      }
      res.send(relatedTracks);
    })
    .catch(e => console.error('ERROR: ', e));
})


app.post('/audioFeatures', (req, res) => {
  const trackId = req.body.track;
  spot
  .request("https://api.spotify.com/v1/audio-features/" + trackId)
    .then(response => {
      res.send(response);
    })
    .catch(e => console.error('ERROR: ', e));
})

app.post('/multipleFeatures', async (req, res)=> {
  const allTracks = req.body.tracks;
  let promises = [];
  for (let i = 0; i < allTracks.length + 100; i += 100){
    const miniArr = allTracks.slice(i, i + 100);
    const featuresQuery = miniArr.join('%2C');
    promises.push(
      spot
        .request('https://api.spotify.com/v1/audio-features?ids=' + featuresQuery))
      
  }
  Promise.all(promises).then(responses => {
   const featuresArr = [].concat(...responses.map(res => res.audio_features));
   res.send(featuresArr);
  })
  .catch(e => {
    res.send(e).status(500);
    console.error('ERROR: ', e)
  });
})

app.post('/multipleTracks', async (req, res) => {
  const tracks = req.body.tracks;
  // console.log('ALL PLAYLIST TRACKS: ', tracks);
  let newTrack = [];
  for (let i = 0; i < tracks.length; i += 50) {

  }

})


/* Create Playlist
app.post('/createPlaylist', async(req, res) => {
  console.log('CREATE PLAYLIST REQ: ', req);
  spot
    .request('https://api.spotify.com/v1/playlists')
      .then(response => {
        console.log('RESPONSE: ', response)
      })
      .catch(e => {
        console.log("ERROR: ", e);
      })
})

*/