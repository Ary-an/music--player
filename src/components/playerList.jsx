import React from "react";
import classes from "./playerList.module.css";

export const PlayerList = props => {
  const { data } = props;

  const musicGrid = data.map((item, pos) => {
    return (
      <div
        className={classes.playerListGrid}
        key={pos}
        onClick={() => props.cardClick(item.id)}
      >
        <img src={item.albumCover} alt={item.track} />
        <div className={classes.info}>
          <p>{item.track}</p>
          <p>{item.artist}</p>
        </div>
      </div>
    );
  });

  return <div className={classes.playerListWrapper}>{musicGrid}</div>;
};
