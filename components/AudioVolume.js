import React, { useState } from "react";
import "./styles.css";

const AudioVolume = function({ player }) {
  const [volumeLevel, setVolumeLevel] = useState(100);

  const onVolumeChange = value => {
    const realValue = value - 100;
    if (player) {
      player.setVolume(realValue / 100);
      setVolumeLevel(value);
    }
  };

  return (
    <div className="player-controls mt-2">
      <div className="player-volume-control ">
        <button
          className="btn btn-secondary m-1"
          disabled={volumeLevel === 0 ? true : false || !player}
          onClick={() => onVolumeChange(0)}
        >
          <i className="fas fa-volume-down" />
        </button>
        <div>
          <input
            onChange={e => onVolumeChange(e.target.value)}
            type="range"
            name="points"
            min="0"
            max="100"
            disabled={!player}
            value={volumeLevel}
          />
        </div>
        <button
          className="btn btn-secondary m-1"
          disabled={volumeLevel === 100 ? true : false}
          onClick={() => onVolumeChange(100)}
        >
          <i className="fas fa-volume-up" />
        </button>
      </div>
    </div>
  );
};

export default AudioVolume;
