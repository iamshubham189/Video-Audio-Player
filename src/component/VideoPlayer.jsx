import { useState, useRef, useEffect, useCallback } from "react";
import "./VideoPlayer.css";
import { formateTime } from "../ulility";
import PlayerControls from "./PlayerControls";
import Buffering from "./Buffering";

const VideoPlayer = ({ url, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);

  const videoPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const onMetaDataLoad = (e) => {
    const { currentTime, duration } = e.target;
    const seconds = Math.floor(duration);

    setDuration(seconds);
    setCurrentTime(currentTime);

    progressBar.current.max = seconds;
  };

  const toggleMute = useCallback(() => {
    const isMute = videoPlayer.current.volume === 0;

    if (isMute) {
      videoPlayer.current.volume = 1;
    } else {
      videoPlayer.current.volume = 0;
    }
  }, []);

  const changePlayerCurrentTime = useCallback(() => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    setCurrentTime(progressBar.current.value);
  }, [duration]);

  const whilePlaying = useCallback(() => {
    progressBar.current.value = videoPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }, [changePlayerCurrentTime]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      videoPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      videoPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying, whilePlaying]);

  const changeRange = (e) => {
    videoPlayer.current.currentTime = e.target.value;
    changePlayerCurrentTime();
  };

  const backTen = useCallback(() => {
    if (videoPlayer.current.currentTime - 10 < 0) {
      videoPlayer.current.currentTime = 0;
    } else {
      videoPlayer.current.currentTime = videoPlayer.current.currentTime - 10;
    }

    whilePlaying();
  }, [whilePlaying]);

  const forwardTen = useCallback(() => {
    if (videoPlayer.current.currentTime + 10 > duration) {
      videoPlayer.current.currentTime = duration;
    } else {
      videoPlayer.current.currentTime = videoPlayer.current.currentTime + 10;
    }

    whilePlaying();
  }, [duration, whilePlaying]);

  const onPlaybackSpeedChange = (value) => {
    const parsedValue = parseFloat(value);

    videoPlayer.current.playbackRate = parsedValue;
    setPlaybackSpeed(parsedValue);
  };

  const toggleFullScreen = useCallback(() => {
    if (videoPlayer.current.requestFullscreen) {
      videoPlayer.current.requestFullscreen();
    } else if (videoPlayer.current.mozRequestFullScreen) {
      videoPlayer.current.mozRequestFullScreen();
    } else if (videoPlayer.current.webkitRequestFullscreen) {
      videoPlayer.current.webkitRequestFullscreen();
    } else if (videoPlayer.current.msRequestFullscreen) {
      videoPlayer.current.msRequestFullscreen();
    }
  }, []);

  const onVolumeChange = (e) => {
    videoPlayer.current.volume = e.target.valueAsNumber;
  };

  useEffect(() => {
    const handler = (e) => {
      console.log(e.code, e.keyCode);
      if (e.code === "Space") {
        togglePlayPause();
      }

      if (e.code === "KeyM") {
        toggleMute();
      }

      if (e.code === "KeyF") {
        toggleFullScreen();
      }

      if (e.code === "KeyN") {
        onNext();
      }

      if (e.code === "KeyP") {
        onPrevious();
      }

      if (e.code === "ArrowRight") {
        forwardTen();
      }

      if (e.code === "ArrowLeft") {
        backTen();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [
    backTen,
    forwardTen,
    onNext,
    onPrevious,
    toggleFullScreen,
    toggleMute,
    togglePlayPause,
  ]);

  const isVideo = url.endsWith(".mp4");
  const Player = isVideo ? "video" : "audio";
  const isMute = videoPlayer?.current?.volume === 0;

  return (
    <div className="container">
      <div>
        <div className="loader-container">
          {isBuffering && <Buffering />}

          <Player
            src={url}
            controls={false}
            ref={videoPlayer}
            preload="metadata"
            onClick={togglePlayPause}
            className="video-player"
            onEnded={togglePlayPause}
            onLoadedMetadata={onMetaDataLoad}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
          />
        </div>

        <div className="player-timeline">
          <div className={currentTime}> {formateTime(currentTime)}</div>

          <input
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
            className="progress-bar"
          />

          <div className={duration}>
            {duration && !isNaN(duration) && formateTime(duration)}
          </div>
        </div>
      </div>

      <PlayerControls
        isMute={isMute}
        onNext={onNext}
        backward={backTen}
        forward={forwardTen}
        isPlaying={isPlaying}
        onPrevious={onPrevious}
        toggleMute={toggleMute}
        playbackSpeed={playbackSpeed}
        togglePlayPause={togglePlayPause}
        toggleFullScreen={toggleFullScreen}
        onVolumeChange={onVolumeChange}
        onPlaybackSpeedChange={onPlaybackSpeedChange}
      />
    </div>
  );
};

export default VideoPlayer;
