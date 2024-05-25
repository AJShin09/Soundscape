const songList = [
    {
        name: "Habang Buhay",
        artist: "Zack Tabuldo",
        src: "music/opm/habangbuhay.mp3",
        cover: "img/zack.jpg",
        bg: "img/zack.jpg"
    },
    {
        name: "illicit affairs",
        artist: "Taylor Swift",
        src: "taylor/illicitaffairs.mp3",
        cover: "taylor/folklore.jpg",
        bg: "taylor/folklore.jpg"
    },
    {
        name: "august",
        artist: "Taylor Swift",
        src: "taylor/august.mp3",
        cover: "taylor/folklore.jpg",
        bg: "taylor/folklore.jpg"
    },
    {
        name: "hatdog",
        artist: "Taylor Swift",
        src: "taylor/august.mp3",
        cover: "taylor/ppop1.jpg",
        bg: "taylor/ppop1.jpg"
    }
]

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillbar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.querySelector('.cover');
const bg = document.getElementById('bg');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;
let back = document.getElementById('back');

back.addEventListener('click', () => {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    song.src = songList[index].src;
    artistName.textContent = songList[index].artist;
    musicName.textContent = songList[index].name;
    cover.style.backgroundImage = `url(${songList[index].cover})`;
    bg.src = songList[index].bg;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
    } else {
        song.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
    }
    playing = !playing;
}

function prevSong() {
    currentSong = (currentSong === 0) ? songList.length - 1 : currentSong - 1;
    loadSong(currentSong);
    if (playing) song.play();
}

function nextSong() {
    currentSong = (currentSong === songList.length - 1) ? 0 : currentSong + 1;
    loadSong(currentSong);
    if (playing) song.play();
}

function updateProgress() {
    const { duration, currentTime } = song;
    const percent = (currentTime / duration) * 100;
    fillbar.style.width = `${percent}%`;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    time.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds} - ${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
}

function seek(event) {
    const progressWidth = prog.clientWidth;
    const clickX = event.offsetX;
    const duration = song.duration;
    
    song.currentTime = (clickX / progressWidth) * duration;
}
