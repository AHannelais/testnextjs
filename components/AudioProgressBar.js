import React, { useEffect, useRef } from "react";
import "./styles.css";
import { useAudioManagement } from "./AudioManagement";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const AudioProgressBar = ({
  player,
  audioState,
  onChangeAudioState,
  playState,
  progress,
  setProgress
}) => {
  const { currentPlayer } = useAudioManagement();
  const onProgressChange = async e => {
    const rate = e.target.value / 100;
    const playbackTime = audioState.duration * rate;
    await onChangeAudioState({
      startedAt: Date.now() - playbackTime * 1000,
      pausedAt: playbackTime * 1000
    });

    setProgress(parseInt(100 * rate));
  };
  const onProgressMouseUp = () => {
    if (playState === "pause") {
      player && player.stop();
      player && player.play((progress * audioState.duration) / 100);
    }
  };
  useInterval(() => {
    const { startedAt, isPause, duration } = audioState;
    if (startedAt && !isPause && player === currentPlayer) {
      const playbackTime = (Date.now() - startedAt) / 1000;
      const rate = parseInt((playbackTime * 100) / duration);
      rate <= 100 && setProgress(rate);
    }
    if (!startedAt) {
      setProgress(0);
    }
  }, 1000);

  return (
    <div
      className="progress player-progress mb-2"
      style={{ position: "relative" }}
    >
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuemax="100"
      />
      <input
        onChange={e => onProgressChange(e)}
        onMouseUp={onProgressMouseUp}
        type="range"
        name="points"
        min="0"
        max="100"
        value={progress}
        disabled={!player}
        style={{ width: `100%`, position: "absolute" }}
      />
    </div>
  );
};

export default AudioProgressBar;
