"use client";

import React from "react";
import PropTypes from "prop-types";
import { Pause, PlayArrow } from "@material-ui/icons";
import "./styles.css";

const PlayButton = ({ playHandler, isPlaying }) => {
  return (
    <div className="icon__btn" onClick={playHandler}>
      {isPlaying ? (
        <Pause fontSize="medium" />
      ) : (
        <PlayArrow fontSize="medium" />
      )}
    </div>
  );
};

export default PlayButton;