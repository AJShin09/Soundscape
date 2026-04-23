// ── SOUNDSCAPE player.js ──
// Reads ?genre=opm|kpop|jpop and ?id=song-id from URL
// Falls back to <meta name="genre"> for playlist pages (jplaylist, kplaylist)

const metaGenre = document.querySelector('meta[name="genre"]')?.content;
const params = new URLSearchParams(window.location.search);
const genreParam = (params.get('genre') || metaGenre || 'opm').toLowerCase();
const idParam = params.get('id');

// DOM refs
const artistNameEl = document.querySelector('.artist-name');
const songNameEl = document.querySelector('.song-name');
const fillbar = document.querySelector('.fill-bar');
const timeEl = document.querySelector('.time');
const coverEl = document.getElementById('cover');
const bgEl = document.getElementById('bg');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');
const counterEl = document.getElementById('song-counter');

let songList = [];
let song = new Audio();
let currentSong = 0;
let playing = false;

// ── fetch song data ──
fetch('songs.json')
    .then(res => res.json())
    .then(data => {
        songList = data[genreParam] || data['opm'];

        // jump to specific song if ?id= provided
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
    })
    .catch(err => {
        console.error('Failed to load songs.json:', err);
        if (songNameEl) songNameEl.textContent = 'Error loading songs';
        if (artistNameEl) artistNameEl.textContent = '';
    });

// ── load a song by index ──
function loadSong(index) {
    const s = songList[index];
    if (!s) return;

    song.src = s.src;
    if (artistNameEl) artistNameEl.textContent = s.artist;
    if (songNameEl) songNameEl.textContent = s.name;
    if (coverEl) coverEl.style.backgroundImage = `url(${s.cover})`;
    if (bgEl) bgEl.src = s.bg || s.cover;
    document.title = `${s.name} — ${s.artist} | SOUNDSCAPE`;

    // update counter
    if (counterEl) {
        counterEl.textContent = `${index + 1} / ${songList.length}`;
    }
}

// ── play / pause ──
function togglePlayPause() {
    if (playing) {
        song.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
    } else {
        song.play().catch(() => { });
        playBtn.classList.replace('fa-play', 'fa-pause');
    }
    playing = !playing;
}

// ── prev / next ──
function prevSong() {
    currentSong = currentSong === 0 ? songList.length - 1 : currentSong - 1;
    loadSong(currentSong);
    if (playing) song.play().catch(() => { });
}

function nextSong() {
    currentSong = currentSong === songList.length - 1 ? 0 : currentSong + 1;
    loadSong(currentSong);
    if (playing) song.play().catch(() => { });
}

// ── progress ──
function updateProgress() {
    const { duration, currentTime } = song;
    if (!duration) return;
    fillbar.style.width = `${(currentTime / duration) * 100}%`;
    const fmt = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
    if (timeEl) timeEl.textContent = `${fmt(currentTime)} - ${fmt(duration)}`;
}

function seek(e) {
    if (song.duration) {
        song.currentTime = (e.offsetX / prog.clientWidth) * song.duration;
    }
}

// ── keyboard shortcuts ──
document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
    } else if (e.code === 'ArrowLeft') {
        prevSong();
    } else if (e.code === 'ArrowRight') {
        nextSong();
    }
});