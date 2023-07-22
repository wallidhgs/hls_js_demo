"use client";

import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Molecules from "../../molecules";
import "./styles.css";

let count = 0;

const Player = ({ url, autoplay = false, title }) => {
  const fsHandle = useFullScreenHandle();
  const playerRef = useRef<HTMLVideoElement>(null);

  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer: true
  });
  const { playing, muted, volume, played, seeking } = videoState;

  useEffect(() => {
    const video = playerRef.current;
    const hls = new Hls();
    console.log(`playing url: ${url}`);
    console.log(`autoplay: ${autoplay}`);

    hls.loadSource(url);
    if (video) hls.attachMedia(video);

    return () => {
      hls.destroy();
    };
  }, [url]);

  const playHandler = () => {
    const video = playerRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      }
      else {
        video.pause();
      }
      setVideoState({ ...videoState, playing: !video.paused });
    }
  };
  const fastSeek = (secs: number) => {
    // secs can be negative
    const video = playerRef.current;
    if (video) {
      video.fastSeek(video.currentTime + secs);
    }
  };
  const controlRef = useRef(null);
  const progressHandler = (state) => {
    if (count > 3) {
      if (controlRef.current) controlRef.current.style.visibility = "hidden";
    } else if (controlRef.current && controlRef.current.style.visibility === "visible") {
      count += 1;
    }

    const video = playerRef.current
    if (!seeking) {
      if (video) setVideoState({ ...videoState, ...state, played: (video.currentTime / video.duration) });
    }
  };
  const mouseMoveHandler = () => {
    if (controlRef.current) controlRef.current.style.visibility = "visible";
    count = 0;
  };
  const seekHandler = (_, value) => {
    const played = parseFloat(value) / 100
    setVideoState({ ...videoState, played });
  };
  const seekMouseUpHandler = (_, value) => {
    const val = parseFloat(value)
    const played = val / 100
    setVideoState({ ...videoState, played });
    const video = playerRef.current;
    if (video) {
      const percent = video.duration / 100
      video.fastSeek(percent * val);
    }
  };
  const volumeHandler = (_, value) => {
    const volume = parseFloat(value) / 100;
    const muted = Number(volume) === 0 ? true : false
    setVideoState({
      ...videoState,
      volume,
      muted
    })
    const video = playerRef.current;
    if (video) {
      video.volume = volume;
      video.muted = muted;
    }
  };
  const muteHandler = () => {
    const muted = !videoState.muted;
    setVideoState({ ...videoState, muted });

    const video = playerRef.current;
    if (video) video.muted = muted;
  };

  const formatDuration = (secs: number) => {
    const h = Math.floor(secs % (3600 * 24) / 3600);
    const m = Math.floor(secs % 3600 / 60);
    const s = Math.floor(secs % 60);

    let ret = '';
    if (h > 0) ret = `${h}:`;
    ret += h > 0 && m < 10 ? `0${m}:` : `${m}:`
    ret += s < 10 ? `0${s}` : `${s}`

    return ret;
  }
  const video = playerRef.current;
  const currentTime = video && formatDuration(video.currentTime);
  const duration = video && formatDuration(video.duration);
  const fsHandle2 = () => {
    if (video) video.requestFullscreen()
  }

  return (
    <FullScreen handle={fsHandle}>
      <div className="player_wrapper" onMouseDown={mouseMoveHandler}>
        <video
          className="player"
          width="100%"
          height="100%"
          ref={playerRef}
          autoPlay={autoplay}
          controls={false}
          onProgress={progressHandler}
          muted={muted}
        />
        <Molecules.Control
          title={title}
          controlRef={controlRef}
          playHandler={playHandler}
          playing={playing}
          rwHandler={() => fastSeek(-5)}
          fwHandler={() => fastSeek(5)}
          played={played}
          seekHandler={seekHandler}
          seekMouseUpHandler={seekMouseUpHandler}
          volumeHandler={volumeHandler}
          muteHandler={muteHandler}
          mute={muted}
          currentTime={currentTime}
          duration={duration}
          fullScreenHandler={fsHandle}
          fullScreenHandler2={fsHandle2}
        />
      </div>
    </FullScreen>
  );
};

export default Player;
