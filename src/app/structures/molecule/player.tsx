"use client";

import React from "react";
import PropTypes from 'prop-types';
import Hls from "hls.js";

interface MyProps {
  url: string,
  autoplay: boolean
};
interface MyState {};

export default class VideoPlayer extends React.Component<MyProps, MyState> {
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
      <>
        <video
          onClick={this.playHandler}
          width="750" height="500"
          ref={player => (this.player = player)}
          autoPlay={this.props.autoplay}
          controls={false}
        />
      </>
    );
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  autoplay: PropTypes.bool
};
