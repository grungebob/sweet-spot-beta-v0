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

  console.log('artist', req.body.artist.id);
  const artistId = req.body.artist.id;
  spotify
  .request('https://api.spotify.com/v1/artists/' + artistId + '/albums')
    .then(response => {
      console.log('ARTIST ALBUMS', (response))
    })

  
})

