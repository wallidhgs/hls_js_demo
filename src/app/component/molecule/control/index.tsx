import React from "react";

import {
    makeStyles, Slider, withStyles, Button, Tooltip, Popover, Grid

} from "@material-ui/core";
import {
    VolumeUp,
    VolumeOff,
    Fullscreen
} from "@material-ui/icons";

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

export default ({
    playHandler, playing, rwHandler, fwHandler, played, seekHandler,
    seekMouseUpHandler, volumeHandler, muteHandler, mute, currentTime,
    duration, controlRef, fullScreenHandler
}) => {
    return (
        <div className="control_Container" ref ={controlRef}>
            <div className="top_container">
                <h2>Video Player</h2>
            </div>

            <div className="mid__container">
                <atom.FastRewindButton handler={rwHandler} />
                <atom.PlayButton playHandler={playHandler} isPlaying={playing} />
                <atom.FastForwardButton handler={fwHandler} />
            </div>

            <div className="bottom__container">
                <div className="slider__container">
                    <PrettoSlider
                        min={0}
                        max={100}
                        value={played * 100}
                        onChange={seekHandler}
                        onChangeCommitted={seekMouseUpHandler}
                    />
                </div>
                <div className="control__box">
                    <div className="inner__controls">
                        <atom.PlayButton playHandler={playHandler} isPlaying={playing} />
                        <div className="icon__btn" onClick={fullScreenHandler}>
                            <Fullscreen fontSize="medium" />
                        </div>
                        <div className="icon__btn" onClick={muteHandler} >
                            {mute ? (
                                <VolumeOff fontSize="medium" />
                            ) : (
                                <VolumeUp fontSize="medium" />
                            )}
                        </div>

                        <Slider
                            onChange={volumeHandler}
                        />
                        <span>{`${currentTime}/${duration}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

