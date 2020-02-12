import React, { useState, useEffect } from "react";
import AudioVolume from "./AudioVolume";
import AudioPlayButton from "./AudioPlayButton";
import AudioProgressBar from "./AudioProgressBar";
import AudioLoadFile from "./AudioLoadFile";
import "./styles.css";
import { useAudioManagement } from "./AudioManagement";

const Audio = (props = { url: null }) => {
  const { currentPlayer } = useAudioManagement();
  const [progress, setProgress] = useState(0);
  const [playState, setPlayState] = useState("play");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState(null);
  const [audioState, setAudioState] = useState({
    startedAt: null,
    pausedAt: null,
    isPause: true,
    duration: 0
  });

  const onChangeAudioState = newState => {
    setAudioState({ ...audioState, ...newState });
  };

  const doLoadFile = async function() {
    try {
      setLoading(true);
      if (player) {
        player.stop();
        onChangeAudioState({
          startedAt: null,
          pausedAt: null,
          isPause: true,
          duration: 0
        });
      }
      const newPlayer = await AudioLoadFile(props.url);
      setLoading(false);
      await setPlayer(newPlayer);
      newPlayer.setVolume(0);
      setProgress(0);
      onChangeAudioState({
        startedAt: 0,
        pausedAt: 0,
        isPause: true,
        duration: newPlayer.duration
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    if (props.url) {
      doLoadFile();
    }
  }, [props.url]);
  useEffect(() => {
    if (player && player !== currentPlayer) {
      player.stop();
      setPlayState("play");
    }
  }, [currentPlayer]);

  return (
    <div>
      <div className="player mt-4">
        <AudioProgressBar
          player={player}
          audioState={audioState}
          onChangeAudioState={onChangeAudioState}
          playState={playState}
          progress={progress}
          setProgress={setProgress}
        />
        <div className="player-controls mt-2">
          <div>{loading && <i className="fas fa-spinner fa-spin"></i>}</div>
          <AudioPlayButton
            player={player}
            audioState={audioState}
            onChangeAudioState={onChangeAudioState}
            loading={loading}
            playState={playState}
            setPlayState={setPlayState}
          />
          <AudioVolume player={player} />
        </div>
      </div>
    </div>
  );
};

export default Audio;
