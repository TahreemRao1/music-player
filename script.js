const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const songs = [
  {
    name: "song1",
    displayName: "Ocean Eyes",
    artist: "Billie Eilish",
    cover: "cover1.jpg"
  },
  {
    name: "song2",
    displayName: "Shape of You",
    artist: "Ed Sheeran",
    cover: "cover2.jpg"
  }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  cover.src = `images/${song.cover}`;
  audio.src = `music/${song.name}.mp3`;
}

loadSong(songs[songIndex]);

// Play/Pause
function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

audio.addEventListener("play", () => {
  isPlaying = true;
});

audio.addEventListener("pause", () => {
  isPlaying = false;
});

// Next/Prev
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

// Progress Bar
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  progress.value = (currentTime / duration) * 100;
  updateTime(currentTimeEl, currentTime);
  updateTime(durationEl, duration);
});

function setProgress() {
  audio.currentTime = (progress.value * audio.duration) / 100;
}

// Volume Control
function setVolume() {
  audio.volume = volume.value;
}

// Update time display
function updateTime(element, time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  element.textContent = `${minutes}:${seconds}`;
}

// Playlist (bonus)
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.displayName} - ${song.artist}`;
  li.onclick = () => {
    songIndex = index;
    loadSong(song);
    audio.play();
  };
  playlistEl.appendChild(li);
});

// Autoplay next song
audio.addEventListener("ended", nextSong);
