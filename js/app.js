// Escopo global
const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    volume = document.getElementById('volume'),
    volumeSlider = document.getElementById('volume-slide');

const music = new Audio();

const songs = [
  {
    path: 'imgs/music-1.mp3',
    displayName: 'Um bom lugar',
    cover: 'imgs/img-1.png',
    artist: 'Sabotage',
  },
  {
    path: 'imgs/music-2.mp3',
    displayName: 'A vida é um desafio',
    cover: 'imgs/img-2.png',
    artist: 'Racionais',
  },
  {
    path: 'imgs/music-3.mp3',
    displayName: 'Oitavo anjo',
    cover: 'imgs/img-3.png',
    artist: '509-E',
  },
  {
    path: 'imgs/music-4.mp3',
    displayName: 'Lembranças',
    cover: 'imgs/img-4.png',
    artist: 'Hungria',
  },
]

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);


let currentVolume = 0.5; // Volume inicial de 50%

// Função para atualizar o volume do áudio
function updateVolume(volumeLevel) {
    music.volume = volumeLevel;
}

// Atualiza o ícone de volume com base no nível de volume atual
function updateVolumeIcon(volumeLevel) {
    if (volumeLevel === 0) {
        volume.classList.replace('fa-volume-low', 'fa-volume-mute');
    } else if (volumeLevel < 0.5) {
        volume.classList.replace('fa-volume-mute', 'fa-volume-low');
    } else {
        volume.classList.replace('fa-volume-mute', 'fa-volume-low');
    }
}

// Função para definir o volume ao clicar no ícone de volume
function toggleMute() {
    if (music.volume === 0) {
        // Se o volume for zero, volta ao volume anterior
        music.volume = currentVolume;
    } else {
        // Caso contrário, armazena o volume atual e define o volume como zero
        currentVolume = music.volume;
        music.volume = 0;
    }
    // Atualiza o ícone de volume
    updateVolumeIcon(music.volume);
}

// Atualiza o volume ao alterar o controle deslizante de volume
volumeSlider.addEventListener('input', () => {
    const volumeLevel = volumeSlider.value / 100;
    updateVolume(volumeLevel);
    updateVolumeIcon(volumeLevel);
});

// Zera o volume quando o ícone de volume é clicado
volume.addEventListener('click', toggleMute);
