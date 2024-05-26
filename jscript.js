const songList = [
    {
        name: "Eine Kleine",
        artist: "Kenshi Yonezu",
        src:"music/jpop/alittle-kenshi.mp3",
        cover: "img/kenshi.jfif",
        bg: "img/kenshi.jfif"
    },
    {
        name: "Encore",
        artist: "Yaosobi",
        src: "music/jpop/encore-yoasobi.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },
    {
        name: "Kirari",
        artist: "Fuji Kaze",
        src: "music/jpop/kirari-fuji.mp3",
        cover: "img/fujikaze.jpeg",
        bg: "img/fujikaze.jpeg"
    },
    {
        name: "Lemon",
        artist: "Kenshi Yonezu",
        src: "music/jpop/lemon-kenshi.mp3",
        cover: "img/kenshi.jfif",
        bg: "img/kenshi.jfif"
    },
    {
        name: "Peace Sign",
        artist: "Kenshi Yonezu",
        src: "music/jpop/peacesign-kenshi.mp3",
        cover: "img/kenshi.jfif",
        bg: "img/kenshi.jfif"
    },
    {
        name: "Seishun",
        artist: "Fujiii Kaze",
        src: "music/jpop/seishun-fuji.mp3",
        cover: "img/fujikaze.jpeg",
        bg: "img/fujikaze.jpeg"
    },
    {
        name: "Tracing",
        artist: "Yaosobi",
        src: "music/jpop/tracing-yoasobi.mp3",
        cover: "img/yoasobi.jpg",
        bg: "img/yoasobi.jpg"
    },{
        name: "Shinunoga E Wa",
        artist: "Fuji Kaze",
        src: "music/jpop/shinunoga-fuji.mp3",
        ccover: "img/fujikaze.jpeg",
        bg: "img/fujikaze.jpeg"
    },{
        name: "OTONABLUE",
        artist: "ATARASHII GAKKO",
        src: "music/jpop/ATARASHII GAKKO! - OTONABLUE (Official Choreography Video).mp3",
        cover: "img/ateashi.jfif",
        bg: "img/ateashi.jfif"
    },{
        name: "Tokyo Calling",
        artist: "ATARASHII GAKKO",
        src: "music/jpop/ATARASHII GAKKO! - Tokyo Calling (Official Music Video).mp3",
        cover: "img/ateashi.jfif",
        bg: "img/ateashi.jfif"
    },{
        name: "Crossing Field",
        artist: "LiSA",
        src: "music/jpop/LiSA - Crossing Field.mp3",
        cover: "img/LISA.jfif",
        bg: "img/LISA.jfif"
    },{
        name: "Rising Hope",
        artist: "LiSA",
        src: "music/jpop/LiSA - Rising Hope.mp3",
        cover: "img/LISA.jfif",
        bg: "img/LISA.jfif"
    },{
        name: "アニメ鬼滅の",
        artist: "LiSA",
        src: "music/jpop/LiSA紅蓮華-MUSiC CLiP-アニメ鬼滅の刃竈門炭治郎 立志編 オープニングテーマ.mp3",
        cover: "img/LISA.jfif",
        bg: "img/LISA.jfif"
    },{
        name: "Sweet Love ",
        artist: "Junko Ohashi",
        src: "music/jpop/Sweet Love.mp3",
        cover: "img/sweetlove.jfif",
        bg: "img/sweetlove.jfif"
    },{
        name: "Flyday Chinatown",
        artist: "Yasuha",
        src: "music/jpop/Yasuha - Flyday Chinatown.mp3",
        cover: "img/yusuha1.jfif",
        bg: "img/yusuha1.jfif"
    },{
        name: "Stay With Me",
        artist: "真夜中のドア",
        src: "music/jpop/真夜中のドアStay With Me.mp3",
        cover: "img/staywith me.jfif",
        bg: "img/staywith me.jfif"
    },{
        name: "Lemon",
        artist: "Kenshi Yonezu",
        src: "music/jpop/lemon-kenshi.mp3",
        cover: "img/kenshi.jfif",
        bg: "img/kenshi.jfif"
    },{
        name: "LOVE TRIP",
        artist: "the peggies",
        src: "music/jpop/the peggies LOVE TRIP(Music Video).mp3",
        cover: "img/the peggies.jfif",
        bg: "img/the peggies.jfif"
    },{
        name: "センチメートル",
        artist: "the peggies",
        src: "music/jpop/the peggiesセンチメートルMusic Video.mp3",
        cover: "img/the peggies.jfif",
        bg: "img/the peggies.jfif"
    },{
        name: "花火",
        artist: "the peggies",
        src: "music/jpop/the peggies花火Music Video.mp3",
        cover: "img/the peggies.jfif",
        bg: "img/the peggies.jfif"
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
