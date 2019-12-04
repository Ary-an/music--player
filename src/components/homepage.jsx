import React from "react";
import classes from "./homepage.module.css";
import axios from "axios";
import Player from "./player";
import { PlayerList } from "./playerList";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playListData: [],
      currentAudio: "",
      status: false,
      playhead: 0,
      shuffle: false,
      repeat: false,
      loadingStatus: true
    };
    this.MusicPlayer = React.createRef();
  }

  loadimg =
    "http://www.myconfinedspace.com/wp-content/uploads/2016/04/Loading-V3.gif";

  controlTrack = str => {
    var playlist = this.state.playListData;
    var id = this.state.currentAudio.id;
    switch (str) {
      case "PLAY":
        this.setState({ status: true });
        this.MusicPlayer.play();
        console.log("played");
        break;
      case "PAUSE":
        this.setState({ status: false });
        this.MusicPlayer.pause();
        break;
      case "NEXT":
        if (parseInt(this.state.currentAudio.id) === playlist.length) {
          id = 0;
        }
        if (this.state.repeat) {
          this.MusicPlayer.currentTime = 0;
          this.setState({ status: true });
          this.MusicPlayer.play();
          return;
        }
        if (this.state.shuffle) {
          id = Math.floor(Math.random() * playlist.length);
        }
        this.setState({ currentAudio: playlist[id], status: true });
        this.MusicPlayer.autoplay = true;
        break;
      case "PREVIOUS":
        if (this.state.currentAudio.id === playlist[0].id) {
          id = 9;
        }
        if (this.state.shuffle) {
          id = Math.floor(Math.random() * playlist.length);
          this.setState({ currentAudio: playlist[id], status: true });
          this.MusicPlayer.autoplay = true;
          return;
        }
        if (this.state.repeat) {
          this.MusicPlayer.currentTime = 0;
          this.setState({ status: true });
          this.MusicPlayer.play();
          return;
        }
        this.setState({ currentAudio: playlist[id - 2], status: true });
        this.MusicPlayer.autoplay = true;
        break;
      case "SHUFFLE":
        if (this.state.shuffle) {
          this.setState({ shuffle: false });
        }
        var shuffleTog = this.state.shuffle;
        this.setState({
          shuffle: !shuffleTog
        });

        break;
      case "RELOAD":
        if (this.state.repeat) {
          this.setState({ repeat: false });
        }
        var repeatTog = this.state.repeat;
        this.setState({
          repeat: !repeatTog
        });
        break;
      default:
    }
  };
  onSeek = event => {
    var per = event.nativeEvent.offsetX / event.target.offsetWidth;
    this.MusicPlayer.currentTime = per * this.MusicPlayer.duration;
  };

  update = event => {
    var playhead =
      (event.target.currentTime / event.target.duration) * 100 + "%";
    this.setState({ playhead });
  };

  trackEnded = () => {
    var playList = this.state.playListData;
    var id = this.state.currentAudio.id;
    if (parseInt(this.state.currentAudio.id) === playList.length) {
      id = 0;
    }
    if (this.state.shuffle) {
      id = Math.floor(Math.random() * playList.length);
    }
    if (this.state.repeat) {
      this.MusicPlayer.play();
      return;
    }
    this.setState({ currentAudio: playList[id], status: true });
    this.MusicPlayer.autoplay = true;
  };
  cardClick = id => {
    const playList = this.state.playListData;
    this.setState({ currentAudio: playList[id - 1], status: true });
    this.MusicPlayer.autoplay = true;
  };
  componentDidMount() {
    axios
      .get("https://5dd1894f15bbc2001448d28e.mockapi.io/playlist")
      .then(res => {
        this.setState({
          playListData: res.data,

          currentAudio: res.data[0],
          loadingStatus: false
        });
      })
      .catch(() => {
        alert("Failed to load data from backend");
      });
  }

  playSong = () => {
    this.MusicPlayer.current.load();
    this.MusicPlayer.current.play();
  };

  pauseSong = () => {
    this.MusicPlayer.current.pause();
  };

  render() {
    return (
      <>
        {!this.state.loadingStatus ? (
          <div className={classes.playerContainer}>
            <div className={classes.playerWrapper}>
              <audio
                ref={input => {
                  this.MusicPlayer = input;
                }}
                src={this.state.currentAudio.file}
                autoPlay={false}
                onEnded={this.trackEnded}
                onTimeUpdate={this.update}
              />
              <Player
                currentAudio={this.state.currentAudio}
                status={this.state.status}
                controlTrack={this.controlTrack}
                playhead={this.state.playhead}
                shuffle={this.state.shuffle}
                repeat={this.state.repeat}
                onSeekClick={this.onSeek}
              />
            </div>
            <div className={classes.playerList}>
              <PlayerList
                data={this.state.playListData}
                cardClick={this.cardClick}
              />
            </div>
          </div>
        ) : (
          <img
            className={classes.loadimg}
            src={this.loadimg}
            alt="loading image"
          />
        )}
      </>
    );
  }
}
