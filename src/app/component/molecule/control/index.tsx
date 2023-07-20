import React from "react";

import {
    makeStyles, Slider, withStyles, Button, Tooltip, Popover, Grid

} from "@material-ui/core";
import {
    Pause,
    PlayArrow,
    SkipNext,
    VolumeUp,
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

export default ({ playHandler, playing, rwHandler, fwHandler }) => {
    return (
        <div className="control_Container">
            <div className="top_container">
                <h2>Video Player</h2>
            </div>

            <div className="mid__container">
                <atom.FastRewindButton handler={rwHandler}/>
                <atom.PlayButton playHandler={playHandler} isPlaying={playing} />
                <atom.FastForwardButton handler={fwHandler}/>
            </div>

            <div className="bottom__container">
                <div className="slider__container">
                    <PrettoSlider />
                </div>
                <div className="control__box">
                    <div className="inner__controls">
                        <atom.PlayButton playHandler={playHandler} isPlaying={playing} />
                        <div className="icon__btn">
                            <SkipNext fontSize="medium" />
                        </div>
                        <div className="icon__btn">
                            <VolumeUp fontSize="medium" />
                        </div>

                        <Slider />
                        {/*<Slider  className={`${classes.volumeSlider}`}  /> */}
                        <span>5/20</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

