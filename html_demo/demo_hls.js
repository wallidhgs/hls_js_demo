document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const videoSrc = 'https://cdn.jwplayer.com/manifests/8Hw3FD28.m3u8';
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
    } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
    }

    function addClickListener(elementId, callback) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', callback);
        }
    }

    addClickListener('restartBtn', () => {
        video.currentTime = 0;
        video.play();
    });
    addClickListener('fastForwardBtn', () => {
        video.currentTime += 5;
    });
    addClickListener('fastBackwardBtn', () => {
        video.currentTime -= 5;
    });
    addClickListener('progressSlider', () => {
        const seekTime = video.duration * (progressSlider.value / 100);
        video.currentTime = seekTime;
    });
    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressSlider.value = progress;

        // Time tracking with format 0:00/0:00
        const timeDisplay = document.getElementById('timeDisplay');
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timeDisplay.textContent = currentTime + '/' + duration;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }

    // Play/Pause controls
    const playPauseBtn = document.getElementById('playPauseBtn');
    addClickListener('playPauseBtn', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    video.addEventListener('pause', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    video.addEventListener('play', () => {
        const playPauseBtn = document.getElementById('playPauseBtn');
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // volume controls
    const muteBtn = document.getElementById('muteBtn');
    const volumeRange = document.getElementById('volumeRange');
    addClickListener('muteBtn', () => {
        if (video.muted) {
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    addClickListener('volumeRange', () => {
        video.volume = volumeRange.value;
        if (volumeRange.value == 0) {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    video.addEventListener('volumechange', () => {
        volumeRange.value = video.muted ? 0 : video.volume;
        muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    // autohide controls
    const videoContainer = document.getElementById('player');
    const customControls = document.querySelector('.custom-controls');
    function showControls() {
        customControls.classList.add('visible');
        customControls.classList.remove('hidden');
    }
    function hideControls() {
        customControls.classList.add('hidden');
        customControls.classList.remove('visible');
    }
    // Show controls when the video container is hovered
    videoContainer.addEventListener('mouseover', showControls);
    // Show controls when the custom controls are hovered
    customControls.addEventListener('mouseover', showControls);
    // Hide controls when the mouse leaves the video container or controls
    videoContainer.addEventListener('mouseout', hideControls);

    // Fullscreen controls
    const container = document.getElementById('container');
    const player = document.getElementById('player');
    function isFullscreen() {
        return (
            document.fullscreenElement === container ||
            document.webkitFullscreenElement === container ||
            document.mozFullScreenElement === container ||
            document.msFullscreenElement === container
        );
    }
    function enterFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    addClickListener('fullscreenBtn', () => {
        if (isFullscreen()) {
            exitFullscreen();
        } else {
            enterFullscreen(container);
        }
    });
    document.addEventListener('fullscreenchange', () => {
        if (isFullscreen()) {
            // Make the player 100% width and height
            // player.style.width = '100%';
            // player.style.height = '100%';
        } else {
            // Restore the player size when exiting fullscreen
            // player.style.width = 'auto';
            // player.style.height = 'auto';
        }
    });
});
