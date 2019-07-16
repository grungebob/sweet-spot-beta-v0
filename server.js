//Spotify Key
const Spotify = require('node-spotify-api');

const spotify = new Spotify({
    id: 'a6c3fc9fc35f459394775a03044f4e75',
    secret: '6aa61a57428341038924b598d6c97fc9'
  });

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
    spotify
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
  spotify
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
  spotify
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
  spotify
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
  spotify
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
  spotify
  .request("https://api.spotify.com/v1/audio-features/" + trackId)
    .then(response => {
      res.send(response);
    })
    .catch(e => console.error('ERROR: ', e));
})

app.post('/multipleFeatures', async (req, res)=> {
  const allTracks = req.body.tracks;
  let featuresArr = [];
  for (let i = 0; i < allTracks.length + 100; i += 100){
    const miniArr = allTracks.slice(i, i + 100);
    const featuresQuery = miniArr.join('%2C');
    await spotify
     .request('https://api.spotify.com/v1/audio-features?ids=' + featuresQuery)
      .then (response => {
        featuresArr = featuresArr.concat(response.audio_features);
      })
      .catch(e => console.error('ERROR: ', e));
  }
  res.send(featuresArr);
})