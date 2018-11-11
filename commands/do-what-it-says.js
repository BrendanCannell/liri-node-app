module.exports = (keys, [filename = 'random.txt']) => {
  let csv = require('fs').readFileSync(filename, 'utf8');
  let [[command, ...args]] = require('csv-parse/lib/sync')(csv);

  return require('./' + command)(keys, args)
}