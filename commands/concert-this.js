let request = require('request-promise-native');
let moment = require('moment');

function formatEvent({ venue: { name, country, region, city }, datetime }) {
  return [
    "Venue: " + name,
    "Location: " + [city, region, country].filter(Boolean).join(', '),
    "Date: " + moment(datetime).format('MM/DD/YYYY')
  ].join('\n');
}

module.exports = (_, [artist]) =>
  request({
    uri: `https://rest.bandsintown.com/artists/${artist}/events`,
    qs: {
      app_id: 'codingbootcamp'
    },
    json: true
  }).then((events) =>
    events.length > 0
      ? events.map(formatEvent).join('\n-------------------------\n')
      : "No events found for artist: " + artist)