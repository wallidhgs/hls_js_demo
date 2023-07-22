"use client"

import React from "react";

import { Slider } from "@material-ui/core";
import Atoms from "../../atoms";

import "./styles.css";

export default ({
    playHandler, playing, rwHandler, fwHandler, played, seekHandler,
    seekMouseUpHandler, volumeHandler, muteHandler, mute, currentTime,
    duration, controlRef, fullScreenHandler, fullScreenHandler2, title
}) => {
    return (
        <div className="control_Container" ref={controlRef}>
            <div className="top_container">
                <h2>{title}</h2>
            </div>

            <div className="mid__container">
                <Atoms.FastRewindButton handler={rwHandler} />
                <Atoms.PlayButton playHandler={playHandler} isPlaying={playing} />
                <Atoms.FastForwardButton handler={fwHandler} />
            </div>

            <div className="bottom__container">
                <Atoms.ProgressSlider played={played} seekHandler={seekHandler} seekMouseUpHandler={seekMouseUpHandler} />
                <div className="control__box">
                    <div className="inner__controls">
                        <Atoms.PlayButton playHandler={playHandler} isPlaying={playing} />
                        <Atoms.FullscreenButton handler={fullScreenHandler} handler2={fullScreenHandler2} />
                        <Atoms.MuteButton muteHandler={muteHandler} mute={mute} />
                        <Slider onChange={volumeHandler} />
                        <span>{`${currentTime}/${duration}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

