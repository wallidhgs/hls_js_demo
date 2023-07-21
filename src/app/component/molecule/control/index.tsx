import React from "react";

import {
    makeStyles, Slider, withStyles, Button, Tooltip, Popover, Grid

} from "@material-ui/core";

import "./styles.css";
import atom from "../../atom";

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
                <atom.FastRewindButton handler={rwHandler} />
                <atom.PlayButton playHandler={playHandler} isPlaying={playing} />
                <atom.FastForwardButton handler={fwHandler} />
            </div>

            <div className="bottom__container">
                <atom.ProgressSlider played={played} seekHandler={seekHandler} seekMouseUpHandler={seekMouseUpHandler} />
                <div className="control__box">
                    <div className="inner__controls">
                        <atom.PlayButton playHandler={playHandler} isPlaying={playing} />
                        <atom.FullscreenButton handler={fullScreenHandler} handler2={fullScreenHandler2} />
                        <atom.MuteButton muteHandler={muteHandler} mute={mute} />
                        <Slider onChange={volumeHandler} />
                        <span>{`${currentTime}/${duration}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

