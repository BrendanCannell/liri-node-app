let Spotify = require('node-spotify-api');

function formatTrack({ artists, name, preview_url, album }) {
  return [
    "Track: " + name,
    "Artist(s): " + artists.map(({ name }) => name).join(", "),
    "Album: " + album.name,
    "URL: " + (preview_url || "N/A")
  ].join('\n')
}

module.exports = (keys, [song = "The Sign"]) =>
  new Spotify(keys.spotify)
    .search({ type: 'track', query: song })
    .then((res) => res.tracks.items.map(formatTrack).join('\n-------------------------\n'))