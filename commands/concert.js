let request = require('request-promise-native');
let moment = require('moment');

function formatEvent({ venue: { name, country, region, city }, datetime }) {
  return [
    "Venue: " + name,
    "Location: " + [city, region, country].filter(Boolean).join(', '),
    "Date: " + moment(datetime).format('MM/DD/YYYY')
  ].join('\n');
}

module.exports = (_, [artist, ...rest]) =>
  !artist
    ? Promise.resolve({ err: "Usage: concert ARTIST/BAND" })
    : request({
      uri: `https://rest.bandsintown.com/artists/${[artist, ...rest].join(' ')}/events`,
      qs: {
        app_id: 'codingbootcamp'
      },
      json: true
    })
      .then((events) =>
        typeof events === 'object'
          ? { ok: events.map(formatEvent).join("\n-------------------------\n") }
          : { err: "No events found for artist: " + [artist, ...rest].join(' ') })