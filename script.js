const musicContainer = document.getElementById("music-container")

const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

const audio = document.getElementById("audio")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const title = document.getElementById("title")
const cover = document.getElementById("cover")

// Song titles
// const songs = ['dropit', 'eternity', 'summerwalk']
const songs = []

// Keep track of song
let songIndex = 1

// Update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

function pauseSong() {
  musicContainer.classList.remove("play")
  playBtn.querySelector("i.fas").classList.remove("fa-pause")
  playBtn.querySelector("i.fas").classList.add("fa-play")

  audio.pause()
}

function playSong() {
  musicContainer.classList.add("play")
  playBtn.querySelector("i.fas").classList.remove("fa-play")
  playBtn.querySelector("i.fas").classList.add("fa-pause")

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

function isPlaying() {
  return musicContainer.classList.contains("play")
}

function togglePlay() {
  isPlaying() ? pauseSong() : playSong()
}

function plusNs(n) {
  audio.currentTime += n
}

function minusNs(n) {
  audio.currentTime -= n
}

// set song current time by clicking on the progress bar
function setProgress(event) {
  const shiftX = event.offsetX
  const progressWidth = this.clientWidth
  const duration = audio.duration
  const newTime = (shiftX / progressWidth) * duration

  audio.currentTime = newTime
}

// update the progress bar while the song is playing
function updateProgress(event) {
  const { duration, currentTime } = event.srcElement
  const progressPercent = (currentTime / duration) * 100

  progress.style.width = `${progressPercent}%`
}

playBtn.addEventListener("click", () => {
  togglePlay()
})

nextBtn.addEventListener("click", nextSong)
prevBtn.addEventListener("click", prevSong)

progressContainer.addEventListener("click", setProgress)

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
    case "k":
      playBtn.blur() // removing focus from button avoids double press if click on play button is followed by spacebar play
      togglePlay()
      break
    case "n":
      nextBtn.blur()
      nextSong()
      break
    case "p":
      prevBtn.blur()
      prevSong()
      break
    case "l":
      plusNs(10)
      break
    case "j":
      minusNs(10)
      break
    case "ArrowRight":
      plusNs(5)
      break
    case "ArrowLeft":
      minusNs(5)
      break
    default:
      break
  }
})

audio.addEventListener("timeupdate", updateProgress)
audio.addEventListener("ended", nextSong)

async function loadSongsArray() {
  try {
    // Fetch the music list from the server
    const response = await fetch("http://localhost:555/getSongsList")
    const data = await response.json()

    data.files.forEach((file) => {
      const songName = file.split(".")[0]
      songs.push(songName)
    })
  } catch (error) {
    console.error("Error fetching music list:", error)
  }
}

window.onload = async () => {
  await loadSongsArray()

  loadSong(songs[songIndex])
}
