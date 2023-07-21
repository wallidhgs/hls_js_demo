"use client";

import React, { useState } from "react";
import { Fullscreen } from "@material-ui/icons";
import "./styles.css";

const FullscreenButton = ({ handler, handler2 }) => {
  const [videoState, setVideoState] = useState({
    isFullscreen: false
  });
  const { isFullscreen } = videoState;

  const fullscreenHandler = () => {
    setVideoState({ ...videoState, isFullscreen: !isFullscreen });
    if (isFullscreen) handler.exit();
    else handler.enter();
  };

  return (
    <div className="icon__btn" onClick={handler2}>
      <Fullscreen fontSize="medium" />
    </div>
  );
};

export default FullscreenButton;
