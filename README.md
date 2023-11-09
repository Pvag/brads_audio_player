# Run the project

- `npm i`
- `node server.js`
- run the index.html file with live server

# Gotchas

- be sure to adjust the port for the CORS policy in the server.js file,
  in order to make it the same as the one provided automatically
  by _Live Server_

# How it works

A server (Express, Node.js) is running locally to retrieve the names
of the audio files in the audio directory.
The client fetches the file name of the audio files and populates
the songs array.
The rest is user-driven.

# Controls

You can control the player using the play/pause, next song, prev. song icons,
and also via keyboard:

- spacebar or 'k' to play/paus
- 'n' for next song
- 'p' for prev. song
- 'l' for +10s
- 'j' for -10s

# TODO

- clicking a number (x) on the keyboard should load and play song number x
- clicking ? should play a random song from the song list
