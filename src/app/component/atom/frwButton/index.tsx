"use client";

import React from "react";
import { FastRewind } from "@material-ui/icons";
import "./styles.css";

const FastRewindButton = ({ handler }) => {
  return (
    <div className="icon__btn" onClick={handler}>
      <FastRewind fontSize="medium" />
    </div>
  );
};

export default FastRewindButton;
