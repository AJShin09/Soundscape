<div align="center">

# SOUNDSCAPE

**Your gateway to Asian music**

![HTML](https://img.shields.io/badge/HTML-0d1117?style=flat-square&logo=html5&logoColor=E34F26)
![CSS](https://img.shields.io/badge/CSS-0d1117?style=flat-square&logo=css3&logoColor=1572B6)
![JavaScript](https://img.shields.io/badge/JavaScript-0d1117?style=flat-square&logo=javascript&logoColor=F7DF1E)
![Vercel](https://img.shields.io/badge/Vercel-0d1117?style=flat-square&logo=vercel&logoColor=ffffff)
![Songs](https://img.shields.io/badge/54%20songs-0d1117?style=flat-square&color=00ff88)

**[▶ Live Demo](https://soundscape-ten-alpha.vercel.app)**

</div>

---

## Overview

Soundscape is a browser-based music player for Asian music — OPM, KPOP, and JPOP. Browse by country, pick a genre, and stream directly in the browser with no login required.

---

## Features

- **Music player** — play, pause, seek, previous/next, song counter
- **Keyboard shortcuts** — `Space` to play/pause, `←` `→` to skip tracks
- **Deep linking** — every song has a shareable URL (`?genre=opm&id=mahika`)
- **54 songs** across 3 regions and 10 subgenres
- **Dynamic backgrounds** — cover art drives the player visual per song

---

## Music Library

| Region | Songs | Subgenres |
|--------|-------|-----------|
| 🇵🇭 Filipino | 20 | OPM · PPOP · RNB · ROCK |
| 🇰🇷 Korean | 15 | KPOP · KRNB · OST |
| 🇯🇵 Japanese | 19 | JPOP · City Pop · Rock · JPM |

---

## Structure

```
Soundscape/
├── index.html          ← Home / quick picks
├── countries.html      ← Region picker
├── player.html         ← Music player
├── player.js           ← Player logic (fetch, playback, keyboard)
├── songs.json          ← Song metadata (id, name, artist, src, cover)
├── base.css            ← Global styles + design tokens
├── player.css          ← Player-specific styles
├── View More Genres/   ← Genre pages per region
└── src/
    ├── img/            ← Album art + backgrounds
    └── sound/          ← Audio files
```

---

## How It Works

Song data lives in `songs.json` keyed by genre (`opm`, `kpop`, `jpop`). The player reads `?genre=` and `?id=` from the URL, finds the matching song, and loads it. Navigating to the next or previous track updates the index and reuses the same audio element.

```js
// Jump to a specific song via URL
player.html?genre=opm&id=mahika
player.html?genre=kpop&id=kill-this-love
player.html?genre=jpop&id=kirari
```

---

## Run Locally

```bash
git clone https://github.com/AJShin09/Soundscape.git
cd Soundscape
# open index.html in browser, or serve with:
npx serve .
```

> Audio files are committed to the repo (~311MB). No build step required.

---

<div align="center">

Deployed on Vercel · Built with vanilla HTML, CSS, and JavaScript

</div>
