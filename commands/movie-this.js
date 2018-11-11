let request = require('request-promise-native');

module.exports = (_, [movie = "Mr. Nobody"]) =>
  request({
    uri: 'http://www.omdbapi.com',
    qs: {
      t: movie,
      plot: 'short',
      apikey: 'trilogy'
    },
    json: true
  }).then((res) =>
    !res.Error
      ? [
        "Title: " + res.Title,
        "Year: " + res.Year,
        "IMDB Rating: " + res.Ratings.find((r) => r.Source === 'Internet Movie Database').Value,
        "Rotten Tomatoes Rating: " + res.Ratings.find((r) => r.Source === 'Rotten Tomatoes').Value,
        "Country(s): " + res.Country,
        "Language(s): " + res.Language,
        "Actor(s): " + res.Actors,
        "Plot: " + res.Plot
      ].join('\n')
      : "Error: " + res.Error
  )