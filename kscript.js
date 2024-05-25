const songList = [
    {
        name: "Kill This Love",
        artist: "BLACKPINK",
        src: "music/kpop/BLACKPINK - 'Kill This Love' MV.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "DDU-DU DDU-DU",
        artist: "BLACKPINK",
        src: "music/kpop/BLACKPINK - 뚜두뚜두 (DDU-DU DDU-DU) MV.mp3",
        cover: "image/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "AS IF IT'S YOUR LAST",
        artist: "BLACKPINK",
        src: "music/kpop/BLACKPINK - '마지막처럼 (AS IF IT'S YOUR LAST)' MV.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "FAKE LOVE",
        artist: "BTS",
        src: "music/kpop/BTS (방탄소년단) 'FAKE LOVE' Official MV.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "LIFE GOES ON",
        artist: "BTS",
        src: "music/kpop/BTS (방탄소년단) 'Life Goes On' Official MV.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "CHEER UP",
        artist: "TWICE",
        src: "music/kpop/TWICE _CHEER UP_ MV.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "I CAN'T STOP ME",
        artist: "TWICE",
        src: "music/kpop/TWICE _I CAN'T STOP ME_ MV.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "WHAT IS LOVE",
        artist: "TWICE",
        src: "music/kpop/TWICE _What is Love__ MV.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "ABOUTIME",
        artist: "B JYUN",
        src: "music/kpop/B JYUN  ABOUTIME.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "LOVE SCENARIO",
        artist: "iKON",
        src: "music/kpop/iKON  LOVE SCENARIO   Audio.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "BATTER UP",
        artist: "BABYMONSTER",
        src: "music/kpop/BABYMONSTER  BATTER UP 7 ver Official Audio.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "SHEESH",
        artist: "BABYMONSTER",
        src: "music/kpop/BABYMONSTER  SHEESH Official Audio.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "OMG",
        artist: "NewJeans",
        src: "music/kpop/NewJeans OMG Lyrics  OMG  Color Coded Lyrics.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "Super Shy",
        artist: "NewJeans",
        src: "music/kpop/NewJeans  Super Shy Official MV.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "BOYFRIEND",
        artist: "Boyfriend",
        src: "music/kpop/BOYFRIEND   Boyfriend Music Video.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
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
