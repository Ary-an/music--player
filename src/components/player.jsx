import React from "react";
import classes from "./player.module.css";
const Player = props => {
  let suffle = ["fas fa-random"];
  if (props.shuffle) {
    suffle.push(classes.active);
  }

  let repeat = ["fas fa-undo"];
  if (props.repeat) {
    repeat.push(classes.active);
  }

  return (
    <div className={classes.playerWrapper}>
      <img
        className={classes.albumCover}
        src={props.currentAudio.albumCover}
        alt="album cover"
      ></img>
      <div className={classes.progressBarWrapper} onClick={props.onSeekClick}>
        <div
          className={classes.progressBar}
          style={{ width: props.playhead }}
        ></div>
      </div>
      <div className={classes.icons}>
        <i
          className={suffle.join(" ")}
          title="shuffle"
          onClick={() => props.controlTrack("SHUFFLE")}
        ></i>

        <i
          className="fas fa-step-backward"
          title="restart"
          onClick={() => props.controlTrack("PREVIOUS")}
        ></i>

        {props.status ? (
          <i
            className="far fa-pause-circle"
            title="pause"
            onClick={() => props.controlTrack("PAUSE")}
          ></i>
        ) : (
          <i
            className="far fa-play-circle pBtn"
            title="play"
            onClick={() => props.controlTrack("PLAY")}
          ></i>
        )}
        <i
          className="fas fa-step-forward"
          title="next"
          onClick={() => props.controlTrack("NEXT")}
        ></i>

        <i
          className={repeat.join(" ")}
          title="repeat"
          onClick={() => props.controlTrack("RELOAD")}
        ></i>
      </div>
      <div className={classes.trackDetails}>
        <h3>{props.currentAudio.track}</h3>
        <p>{props.currentAudio.artist}</p>
      </div>
    </div>
  );
};
export default Player;
