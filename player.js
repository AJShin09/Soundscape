// reads ?genre=opm or ?genre=kpop or ?genre=jpop from the URL
// reads ?id=mahika to start on a specific song (used by single-song links)

const metaGenre = document.querySelector('meta[name="genre"]')?.content;
const params = new URLSearchParams(window.location.search);
const genreParam = (params.get('genre') || metaGenre || 'opm').toLowerCase();
const idParam = params.get('id');

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillbar = document.querySelector('.fill-bar');
const timeEl = document.querySelector('.time');
const cover = document.querySelector('.cover');
const bgEl = document.getElementById('bg');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');
const backBtn = document.getElementById('back');

let songList = [];
let song = new Audio();
let currentSong = 0;
let playing = false;

if (backBtn) {
    backBtn.addEventListener('click', () => window.history.back());
}

fetch('songs.json')
    .then(res => res.json())
    .then(data => {
        songList = data[genreParam] || data['opm'];

        // if a specific song id was requested, start on it
        if (idParam) {
            const idx = songList.findIndex(s => s.id === idParam);
            if (idx !== -1) currentSong = idx;
        }

        loadSong(currentSong);
        song.addEventListener('timeupdate', updateProgress);
        song.addEventListener('ended', nextSong);
        if (prevBtn) prevBtn.addEventListener('click', prevSong);
        if (nextBtn) nextBtn.addEventListener('click', nextSong);
        playBtn.addEventListener('click', togglePlayPause);
        prog.addEventListener('click', seek);
    });

function loadSong(index) {
    const s = songList[index];
    song.src = s.src;
    artistName.textContent = s.artist;
    musicName.textContent = s.name;
    cover.style.backgroundImage = `url(${s.cover})`;
    if (bgEl) bgEl.src = s.bg;
    document.title = `${s.name} — ${s.artist}`;
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
    currentSong = currentSong === 0 ? songList.length - 1 : currentSong - 1;
    loadSong(currentSong);
    if (playing) song.play();
}

function nextSong() {
    currentSong = currentSong === songList.length - 1 ? 0 : currentSong + 1;
    loadSong(currentSong);
    if (playing) song.play();
}

function updateProgress() {
    const { duration, currentTime } = song;
    if (!duration) return;
    fillbar.style.width = `${(currentTime / duration) * 100}%`;
    const fmt = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
    timeEl.textContent = `${fmt(currentTime)} - ${fmt(duration)}`;
}

function seek(e) {
    if (song.duration) {
        song.currentTime = (e.offsetX / prog.clientWidth) * song.duration;
    }
}