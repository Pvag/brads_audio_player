const musicContainer = document.getElementById('music-container')

const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')

// Song titles
const songs = ['dropit', 'eternity', 'summerwalk']

// Keep track of song
let songIndex = 1

// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

// Initially load song details into DOM
loadSong(songs[songIndex])

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) songIndex = 0

    loadSong(songs[songIndex])
    playSong()
}

function prevSong() {
    songIndex--
    if (songIndex < 0) songIndex = songs.length - 1

    loadSong(songs[songIndex])
    playSong()
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) pauseSong()
    else playSong()
})

nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)