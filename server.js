//Spotify Key
const Spotify = require('node-spotify-api');

const spotify = new Spotify({
    id: 'a6c3fc9fc35f459394775a03044f4e75',
    secret: '6aa61a57428341038924b598d6c97fc9'
  });

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Bruv - we listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'This is what is returned from /express_backend' });
});

app.post('/artistSearch', (req, res) => {
    console.log('req boday', req.body)


})

