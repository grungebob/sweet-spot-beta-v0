const Spotify = require('node-spotify-api');

const spotify = new Spotify({
    id: 'a6c3fc9fc35f459394775a03044f4e75',
    secret: '6aa61a57428341038924b598d6c97fc9'
  });

module.exports = spotify;