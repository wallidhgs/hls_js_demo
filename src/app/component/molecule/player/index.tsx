"use client";

import React from "react";
import PropTypes from 'prop-types';
import Hls from "hls.js";
import { Container } from "@mui/material";
import Control from '../control/index'

import "./styles.css";

interface MyProps {
  url: string,
  autoplay: boolean
};
interface MyState { };

export default class Player extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.playHandler = this.playHandler.bind(this);
  }

  static defaultProps = {
    autoplay: false
  }
  static propTypes: {
    url: PropTypes.Validator<string>;
    autoplay: PropTypes.Requireable<boolean>;
  };

  state = {};
  player: any;

  componentDidMount() {
    console.log('componentDidMount')
    const video = this.player;
    const hls = new Hls();
    console.log(`playing url: ${this.props.url}`)
    console.log(`autoplay: ${this.props.autoplay}`)

    hls.loadSource(this.props.url);
    hls.attachMedia(video);
  }

  playHandler = () => {
    if (this.player.paused) {
      console.log('play button')
      this.player.play();
    } else {
      console.log('stop button')
      this.player.pause();
    }
  }
  render() {
    return (
        <div className="video_container">
          <div>
            <h2>React player</h2>
          </div>
         <Container maxWidth='md'>
            <div className="player__wrapper">
              <video
                className="player"
                onClick={this.playHandler}
                width="100%" height="100%"
                ref={player => (this.player = player)}
                autoPlay={this.props.autoplay}
                controls={false}
              />
              <Control />
            </div>
          </Container>
        </div>
    );
  }
}

Player.propTypes = {
  url: PropTypes.string.isRequired,
  autoplay: PropTypes.bool
};
