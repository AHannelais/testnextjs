import React from "react";
import "./styles.css";
import { useAudioManagement } from "./AudioManagement";

const AudioPlayButton = ({
  player,
  audioState,
  onChangeAudioState,
  loading,
  playState,
  setPlayState
}) => {
  const { onChangeCurrentPlayer } = useAudioManagement();
  const onPlayBtnClick = async () => {
    onChangeCurrentPlayer(player);
    onChangeAudioState({
      startedAt: Date.now() - audioState.pausedAt,
      isPause: false
    });
    player.play(audioState.pausedAt / 1000);
    setPlayState("pause");
  };
  const onStopBtnClick = (e, pause = true) => {
    onChangeCurrentPlayer(null);
    e.preventDefault();
    if (!pause) {
      onChangeAudioState({
        pausedAt: null,
        startedAt: null,
        isPause: true
      });
    } else {
      onChangeAudioState({
        pausedAt: Date.now() - audioState.startedAt,
        isPause: true
      });
    }

    player && player.stop();
    setPlayState("play");
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        onClick={playState === "play" ? onPlayBtnClick : onStopBtnClick}
        disabled={loading || !player}
      >
        <i className={`fas fa-${playState}`}></i>
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={e => onStopBtnClick(e, false)}
        disabled={loading || !audioState.startedAt}
      >
        <i className="fas fa-stop"></i>
      </button>
    </div>
  );
};

export default AudioPlayButton;
