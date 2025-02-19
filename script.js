document.addEventListener("DOMContentLoaded", function () {
    const playPauseBtn = document.querySelector(".player-controls img:nth-child(3)");
    const progressBar = document.querySelector(".progress-bar");
    const currentTimeEl = document.querySelector(".current-time");
    const totalTimeEl = document.querySelector(".total-time");
    const volumeControl = document.querySelector(".control .progress-bar");
    const volumeIcon = document.querySelector(".fa-volume-high");
    const nextBtn = document.querySelector(".player-controls img:nth-child(4)");
    const prevBtn = document.querySelector(".player-controls img:nth-child(2)");
    const songTitleEl = document.querySelector(".p1");
    const songArtistEl = document.querySelector(".p2");
    const songImageEl = document.querySelector(".cur-pic");
    const songCards = document.querySelectorAll(".card");
    let isPlaying = false;
    let currentTrackIndex = 0;
    const playlist = [
        { src: "./Assests/song1.mp3", title: "Mahiye Jinna Sohna", artist: "Darshan Raval", image: "./Assests/card2img.jpeg" },
        { src: "./Assests/song2.mp3", title: "Apna Bana Le", artist: "Sachin-Jagar, Arijit Singh", image: "./Assests/card3img.jpeg" },
        { src: "./Assests/song3.mp3", title: "Ami Je Tomar", artist: "Pritam, Shreya Ghoshal, Arijit Singh", image: "./Assests/card4img.jpeg" },
        { src: "./Assests/song4.mp3", title: "Sooseki", artist: "Pushpa 2 - Shreya Ghoshal", image: "./Assests/card7img.jpeg" },
        { src: "./Assests/song5.mp3", title: "Woh Din", artist: "Pritam, Arijit Singh", image: "./Assests/card8img.jpeg" }
    ];
    let audio = new Audio(playlist[currentTrackIndex].src);

    // Play/Pause Functionality
    playPauseBtn.addEventListener("click", function () {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.src = "./Assests/player_icon3.png";
        } else {
            audio.play();
            playPauseBtn.src = "./Assests/pause_icon.png";
        }
        isPlaying = !isPlaying;
    });

    // Update Progress Bar
    audio.addEventListener("timeupdate", function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    // Seek Functionality
    progressBar.addEventListener("input", function () {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    // Volume Control
    volumeControl.addEventListener("input", function () {
        audio.volume = volumeControl.value / 100;
        updateVolumeIcon(audio.volume);
    });

    // Mute/Unmute Functionality
    volumeIcon.addEventListener("click", function () {
        if (audio.volume > 0) {
            audio.volume = 0;
            volumeControl.value = 0;
        } else {
            audio.volume = 0.5;
            volumeControl.value = 50;
        }
        updateVolumeIcon(audio.volume);
    });

    function updateVolumeIcon(volume) {
        if (volume === 0) {
            volumeIcon.classList.replace("fa-volume-high", "fa-volume-mute");
        } else {
            volumeIcon.classList.replace("fa-volume-mute", "fa-volume-high");
        }
    }

    // Next Song
    nextBtn.addEventListener("click", function () {
        changeTrack(1);
    });

    // Previous Song
    prevBtn.addEventListener("click", function () {
        changeTrack(-1);
    });

    function changeTrack(direction) {
        currentTrackIndex = (currentTrackIndex + direction + playlist.length) % playlist.length;
        updatePlayer(currentTrackIndex);
    }

    // Play song on clicking card
    songCards.forEach((card, index) => {
        card.addEventListener("click", function () {
            currentTrackIndex = index-1;
            updatePlayer(currentTrackIndex);
        });
    });

    function updatePlayer(index) {
        if (audio) {
            audio.pause();
        }
        audio = new Audio(playlist[index].src);
        songTitleEl.textContent = playlist[index].title;
        songArtistEl.textContent = playlist[index].artist;
        songImageEl.src = playlist[index].image;
        audio.play();
        playPauseBtn.src = "./Assests/pause_icon.png";
        isPlaying = true;

        // Update progress bar dynamically
        audio.addEventListener("timeupdate", function () {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;
            currentTimeEl.textContent = formatTime(audio.currentTime);
            totalTimeEl.textContent = formatTime(audio.duration);
        });
    }

    // Format time function
    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
});
