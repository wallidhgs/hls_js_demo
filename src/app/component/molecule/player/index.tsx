"use client";

import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Hls from "hls.js";
import { Container } from "@mui/material";
import Control from "../control/index";
import "./styles.css";

interface MyProps {
  url: string;
  autoplay: boolean;
}

const Player= ({ url, autoplay = false }) => {
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

  return (
    <div className="video_container">
      <div>
        <h2>React player</h2>
      </div>
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
          />
          <Control playHandler={playHandler} playing={playing} />
        </div>
      </Container>
    </div>
  );
};

export default Player;
