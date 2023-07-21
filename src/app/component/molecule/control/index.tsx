import React from "react";

import {
    makeStyles, Slider, withStyles, Button, Tooltip, Popover, Grid

} from "@material-ui/core";

import "./styles.css";
import atom from "../../atom";

const useStyles = makeStyles({
    volumeSlider: {
        width: "100px",
        color: "#9556CC",
    },

    bottomIcons: {
        color: "#999",
        padding: "12px 8px",


        "&:hover": {
            color: "#fff",
        },
    },
});

export default ({
    playHandler, playing, rwHandler, fwHandler, played, seekHandler,
    seekMouseUpHandler, volumeHandler, muteHandler, mute, currentTime,
    duration, controlRef, fullScreenHandler, title
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
                        <atom.FullscreenButton handler={fullScreenHandler} />
                        <atom.MuteButton muteHandler={muteHandler} mute={mute} />
                        <Slider onChange={volumeHandler} />
                        <span>{`${currentTime}/${duration}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

