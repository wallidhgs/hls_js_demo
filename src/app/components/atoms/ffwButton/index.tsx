"use client";

import React from "react";
import { FastForward } from "@material-ui/icons";
import "./styles.css";

const FastForwardButton = ({ handler }) => {
  return (
    <div className="icon__btn" onClick={handler}>
      <FastForward fontSize="medium" />
    </div>
  );
};

export default FastForwardButton;
