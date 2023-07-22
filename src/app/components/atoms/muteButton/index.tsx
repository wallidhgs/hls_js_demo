"use client";

import React from "react";
import { VolumeOff, VolumeUp } from "@material-ui/icons";
import "./styles.css";

const MuteButton = ({ muteHandler, mute }) => {
  return (
    <div className="icon__btn" onClick={muteHandler}>
      {mute ? (
        <VolumeOff fontSize="medium" />
      ) : (
        <VolumeUp fontSize="medium" />
      )}
    </div>
  );
};

export default MuteButton;
