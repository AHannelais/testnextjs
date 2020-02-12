import "./styles.css";
import axios from "axios";

const getAudioContext = () => {
  AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContent = new AudioContext();

  return audioContent;
};

const AudioLoadFile = url =>
  new Promise(async (resolve, reject) => {
    try {
      // load audio file from server
      const response = await axios.get(url, {
        responseType: "arraybuffer"
      });

      // create audio context
      const audioContext = getAudioContext();
      const gainNode = audioContext.createGain();
      // create audioBuffer (decode audio file)
      const audioBuffer = await audioContext.decodeAudioData(response.data);
      let scriptNode = audioContext.createScriptProcessor(
        4096,
        audioBuffer.numberOfChannels,
        audioBuffer.numberOfChannels
      );
      let source;
      const play = function(resumeTime = 0) {
        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(scriptNode);
        source.connect(audioContext.destination);
        scriptNode.connect(audioContext.destination);
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        source && source.start(0, resumeTime);
      };
      const stop = function() {
        source && source.stop(0);
      };
      const setVolume = function(level) {
        gainNode.gain.setValueAtTime(level, audioContext.currentTime);
      };

      resolve({ play, stop, setVolume, duration: audioBuffer.duration });
    } catch (e) {
      reject(e);
    }
  });
export default AudioLoadFile;
