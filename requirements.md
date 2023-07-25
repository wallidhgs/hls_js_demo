# Requirements

Create a bare-bones website with a custom video player that implements the [HLS.js][hls.js] Javascript library to support HLS streaming protocol media.

## Main requirements

Create a video player that uses custom controls and implements the [HLS.js][hls.js] library to reproduce the following M3U8 file: [8Hw3FD28.m3u8][demo_video]. The following acceptance criteria will be required:

1. Uses the HLS.js library to reproduce compliant video/streams when native browser support is not available.
2. Custom time slider to track the video elapsed time and that allows for seeking of the video.
3. A rewind and forward button that allow for a 5 second rewind and forward seek action.
4. Play button that allows for video playback when clicked, turns into a pause button when video is playing and reverts to a pause button when video is not playing or has ended.
5. A mute button that lets the user mute the video when clicked, visually changes to let the user know that audio has been muted, and properly interacts with the volume slider.
6. A volume slider to control video volume.
7. A time tracking section that displays the elapsed time and the duration of the video. The format for this section will be 0:00 / 0:00, e.g. 0:18 12:14.
8. A fullscreen toggle button that when clicked and player is not in fullscreen transitions player into fullscreen, and viceversa. Furthermore, the button needs to let the user visually know in what state the player is.
9. Proper interaction between all the elements, e.g. clicking on the rewind button, lets the user go back 5 seconds in the video and the time slider visually reacts to this change as well.
10.Video player looks and functions adequately in all 3 major browsers, Safari, Chrome, and Firefox.

## Additional requirements

The following criteria are nice to have, but not required:

1. ARIA/accessibility.
2. Next and Back buttons to move play video/stream files within a playlist. 3. Controls hide on playback and reappear on mouse hover.
3. Ability to repeat video when it ends
4. Ability to add a video title and description
5. Some sort of HLS instance destruction mechanism
6. Ability to customize UI
7. Responsiveness.

[hls.js]: https://github.com/video-dev/hls.js/tree/master
[demo_video]: [https://cdn.jwplayer.com/manifests/8Hw3FD28.m3u8]
