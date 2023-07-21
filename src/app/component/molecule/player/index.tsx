"use client";

import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { Container } from "@mui/material";
import Control from "../control/index";
import "./styles.css";

interface MyProps {
  url: string;
  autoplay: boolean;
}

const Player = ({ url, autoplay = false }) => {
  const playerRef = useRef<HTMLVideoElement>(null);

  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer: true
  });
  const { playing, muted, volume, playbackRate, played, seeking, buffer } = videoState;

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
      console.log('video exists')
      if (video.paused) {
        console.log('playing video')
        video.play();
      }
      else {
        console.log('pausing video')
        video.pause();
      }
      setVideoState({ ...videoState, playing: !video.paused });
    }
  };
  const fastSeek = (secs: number) => {
    console.log(`moving ${secs} secs`)
    // secs can be negative
    const video = playerRef.current;
    if (video) {
      video.fastSeek(video.currentTime + secs);
    }
  };
  const progressHandler = (state) => {
    const video = playerRef.current
    if (!seeking) {
      if (video) setVideoState({ ...videoState, ...state, played: (video.currentTime / video.duration) });
    }
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
    console.log('volumeHandler')
    const volume = parseFloat(value) / 100;
    console.log(`newVolume ${volume}`)
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

  return (
    <div className="video_container">
      <Container maxWidth="md">
        <div className="player__wrapper">
          <video
            className="player"
            onClick={playHandler}
            width="100%"
            height="100%"
            ref={playerRef}
            autoPlay={autoplay}
            controls={false}
            onProgress={progressHandler}
            muted={muted}
          />
          <Control
            playHandler={playHandler}
            playing={playing}
            rwHandler={() => fastSeek(-5)}
            fwHandler={() => fastSeek(5)}
            played={played}
            seekHandler={seekHandler}
            seekMouseUpHandler={seekMouseUpHandler}
            volumeHandler={volumeHandler}
          />
        </div>
      </Container>
    </div>
  );
};

export default Player;
