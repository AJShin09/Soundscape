const songList = [
    {
        name: "Habang Buhay",
        artist: "Zack Tabuldo",
        src: "music/opm/habangbuhay.mp3",
        cover: "img/zack.jpg",
        bg: "img/zack.jpg"
    },
    {
        name: "HKP",
        artist: "Sunkissed Lola",
        src: "music/opm/HKP (lyrics) - Sunkissed Lola.mp3",
        cover: "img/Sunkissed-Lola-pic1-1024x683.jpg",
        bg: "img/Sunkissed-Lola-pic1-1024x683.jpg"
    },
    {
        name: "This Ain't Love",
        artist: "Lola Amour",
        src: "music/opm/Lola Amour - This Ain't Love (Official Lyric Video).mp3",
        cover: "img/lola-amour.jpg",
        bg: "img/lola-amour.jpg"
    },
    {
        name: "Makakalimutan Ka",
        artist: "Sunkissed Lola",
        src: "music/opm/Makalimutan ka (lyrics) - Sunkissed Lola.mp3",
        cover: "img/Sunkissed-Lola-pic1-1024x683.jpg",
        bg: "img/Sunkissed-Lola-pic1-1024x683.jpg"
    },
    {
        name: "Kapit Bitiw",
        artist: "MRLD",
        src: "music/opm/Kapit Bitiw.mp3",
        cover: "img/mrld.jfif",
        bg: "img/mrld.jfif"
    },
    {
        name: "Maligayang Pagkukunwari",
        artist: "MRLD",
        src: "music/opm/mrld - Maligayang Pagkunwari (Official Audio).mp3",
        cover: "img/mrld.jfif",
        bg: "img/mrld.jfif"
    },
    {
        name: "Pasilyo",
        artist: "Sunkissed Lola",
        src: "music/opm/SunKissed Lola - Pasilyo.mp3",
        cover: "img/Sunkissed-Lola-pic1-1024x683.jpg",
        bg: "img/Sunkissed-Lola-pic1-1024x683.jpg"
    },
    {
        name: "Your Eyes, They Lie",
        artist: "MRLD",
        src: "music/opm/your eyes, they lie (official audio).mp3",
        cover: "img/mrld.jfif",
        bg: "img/mrld.jfif"
    },
    {
        name: "Paraluman",
        artist: "Adie",
        src: "music/opm/Paraluman.mp3",
        cover: "img/adie.jpg",
        bg: "img/adie.jpg"
    },
    {
        name: "Asan Ka Na Ba",
        artist: "Zack Tabuldo",
        src: "music/opm/Zack Tabudlo - Asan Ka Na Ba (Lyric Video).mp3",
        cover: "img/zack.jpg",
        bg: "img/zack.jpg"
    },
    {
        name: "Pano",
        artist: "Zack Tabuldo",
        src: "music/opm/Zack Tabudlo - Pano (Lyric Video).mp3",
        cover: "img/zack.jpg",
        bg: "img/zack.jpg"
    },
    {
        name: "Umiinit",
        artist: "Lola Amour",
        src: "music/opm/Lola Amour - Umiinit (Official Lyric Video).mp3",
        cover: "img/lola-amour.jpg",
        bg: "img/lola-amour.jpg"
    },
    {
        name: "Dungaw",
        artist: "Adie",
        src: "music/opm/Dungaw.mp3",
        cover: "img/adie.jpg",
        bg: "img/adie.jpg"
    },
    {
        name: "Mahika",
        artist: "Adie",
        src: "music/opm/Mahika.mp3",
        cover: "img/adie.jpg",
        bg: "img/adie.jpg"
    },
    {
        name: "You'll Be Safe Here",
        artist: "Adie",
        src: "music/opm/You'll Be Safe Here.mp3",
        cover: "img/adie.jpg",
        bg: "img/adie.jpg"
    },
    {
        name: "I'll Give My Heart",
        artist: "Lola Amour",
        src: "music/opm/Lola Amour - I'll Give My Heart (Official Lyric Video).mp3",
        cover: "img/lola-amour.jpg",
        bg: "img/lola-amour.jpg"
    },
    {
        name: "Namimiss Ko Na",
        artist: "Lola Amour",
        src: "music/opm/Lola Amour - Namimiss Ko Na (Official Lyric Video).mp3",
        cover: "img/lola-amour.jpg",
        bg: "img/lola-amour.jpg"
    },
    {
        name: "Raining in Manila",
        artist: "Lola Amour",
        src: "music/opm/Lola Amour - Raining in Manila (Official Lyric Video).mp3",
        cover: "img/lola-amour.jpg",
        bg: "img/lola-amour.jpg"
    },
    {
        name: "Hinto Galaw",
        artist: "MRLD",
        src: "music/opm/Hinto Galaw.mp3",
        cover: "img/mrld.jfif",
        bg: "img/mrld.jfif"
    },
    {
        name: "Tinatangi",
        artist: "Adie",
        src: "music/opm/Tinatangi (feat. Chrstn) (feat. Chrstn).mp3",
        cover: "img/adie.jpg",
        bg: "img/adie.jpg"
    },
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
