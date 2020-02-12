import React, { useState, useContext } from "react";

export const AudioManagementContext = React.createContext();
export const useAudioManagement = () => useContext(AudioManagementContext);
const AudioManagementProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState();

  const onChangeCurrentPlayer = function(newPlayer = null) {
    setCurrentPlayer(newPlayer);
  };
  const onStopPlayer = function() {
    console.log("try to stop player");
    if (currentPlayer) {
      currentPlayer.stop();
    }
  };
  console.log("currentPlayer", currentPlayer);
  return (
    <AudioManagementContext.Provider
      value={{
        currentPlayer,
        onChangeCurrentPlayer,
        onStopPlayer
      }}
    >
      {children}
    </AudioManagementContext.Provider>
  );
};

export default AudioManagementProvider;
