# liri-node-app

`liri-node-app` searchs various APIs for information on songs, movies, and upcoming music events. The information is printed to the terminal and also logged in `log.txt`.

## Interface

Due to a misunderstanding, I wrote this app as a read-evaluate-print loop. It is launched with `node liri` and then commands are entered at the prompt, e.g., `spotify The Sign`. Use `CTRL-C` to quit.

Double quotes are allowed but ignored, so `movie Mr. Nobody`, `movie "Mr. Nobody"`, and `movie "Mr." "Nobody"` all behave the same.

Unknown commands are refused:

![](./doc/unknown.gif)

Known commands with invalid inputs return an error message:

![](./doc/invalid.gif)

## Architecture

`liri.js` runs the `inquirer` loop, reading the user input and dispatching each `<command-name> <args> ...` to the function exported by `./commands/<command-name>.js`. That function receives the `keys` object and an array of the arguments to the command, and it returns a `Promise` that resolves to either `{ ok: "<output>" }` or `{ err: "<error-message>" }`. In both cases the value is printed, but only `ok` values are logged to `log.txt`.

## Commands

### concert

No default argument.

![](./doc/concert.gif)

### movie

Default argument: `Mr. Nobody`

![](./doc/movie.gif)

### spotify

Default argument: `The Sign`

![](./doc/spotify.gif)

### do-what-it-says

Default argument: `random.txt`

![](./doc/do-what-it-says.gif)