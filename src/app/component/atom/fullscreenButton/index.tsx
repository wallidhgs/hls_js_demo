"use client";

import React from "react";
import { Fullscreen } from "@material-ui/icons";
import "./styles.css";

const FullscreenButton = ({ handler }) => {
  return (
    <div className="icon__btn" onClick={handler}>
      <Fullscreen fontSize="medium" />
    </div>
  );
};

export default FullscreenButton;
