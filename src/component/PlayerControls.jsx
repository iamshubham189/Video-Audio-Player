import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import {
  MdPictureInPictureAlt,
  MdForward10,
  MdOutlineReplay10,
} from "react-icons/md";

import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function PlayerControls({
  isMute,
  isPlaying,
  togglePlayPause,
  toggleMute,
  forward,
  backward,
  onNext,
  onPrevious,
  playbackSpeed,
  toggleFullScreen,
  onVolumeChange,
  onPlaybackSpeedChange,
}) {
  return (
    <div className="controls">
      <button onClick={onPrevious}>
        <GrFormPrevious />
      </button>

      <button className="ForwardBackward" onClick={backward}>
        <MdOutlineReplay10 />
        {/* -10 */}
      </button>
      <button onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button className="ForwardBackward" onClick={forward}>
        <MdForward10 />
      </button>

      <button onClick={onNext}>
        <GrFormNext />
      </button>

      <button onClick={toggleMute}>
        {isMute ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      <input
        min={0}
        max={1}
        step={0.1}
        type="range"
        defaultValue={0.5}
        onChange={onVolumeChange}
      />

      {/* <button>
        <MdOutlineSlowMotionVideo />
      </button> */}

      <select
        value={playbackSpeed}
        onChange={(e) => onPlaybackSpeedChange(e.target.value)}
      >
        <option value="0.25">x 0.25</option>
        <option value="0.5">x 0.5</option>
        <option value="0.75">x 0.75</option>
        <option value="1">x 1</option>
        <option value="1.25">x 1.25</option>
        <option value="1.5">x 1.5</option>
        <option value="1.75">x 1.75</option>
        <option value="2">x 2</option>
        <option value="2.25">x 2.25</option>
        <option value="2.5">x 2.5</option>
        <option value="2.75">x 2.75</option>
        <option value="3">x 3</option>
      </select>

      <button>
        <MdPictureInPictureAlt />
      </button>

      <button onClick={toggleFullScreen}>
        <MdFullscreen />
      </button>
    </div>
  );
}

export default PlayerControls;
