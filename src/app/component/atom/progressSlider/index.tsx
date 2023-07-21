"use client";

import React from "react";
import {
  Slider, withStyles
} from "@material-ui/core";
import "./styles.css";

const PrettoSlider = withStyles({
  root: {
    height: "20px",
    color: "#9556CC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#9556CC",
    border: "2px solid currentColor",
    marginTop: -3,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const ProgressSlider = ({ played, seekHandler, seekMouseUpHandler }) => {
  return (
    <div className="slider__container">
      <PrettoSlider
        min={0}
        max={100}
        value={played * 100}
        onChange={seekHandler}
        onChangeCommitted={seekMouseUpHandler}
      />
    </div>
  );
};

export default ProgressSlider;
