import React, { useRef, useEffect, useState } from "react";
import playMusicIcon from "../assets/sss.svg";
import pauseMusic from "../assets/ddd.svg";
import prevIcon from "../assets/prev.svg";
import nextIcon from "../assets/next.svg";
import restartIcon from "../assets/restartIcon.svg";
import "./comp.css";

function Footer({
  isPlaying,
  handleMusic,
  audioRef,
  handlePrevTrack,
  handleNextTrack,
  handleRestartTrack,
  currentTrack,
}) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioRef]);

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (audio && audio.duration && isFinite(audio.duration)) {
      const rect = progressRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = (offsetX / rect.width) * 100;
      const newTime = (audio.duration * percent) / 100;
      if (isFinite(newTime)) {
        audio.currentTime = newTime;
        setProgress(percent);
      }
    }
  };

  return (
    <div className="footerMusic bg-[#181818] p-4 flex flex-col mb-0  justify-between items-center w-[765px] h-[100px]">
      <div className="footer flex items-center justify-between w-[600px]">
        {currentTrack && (
          <div className="current-track-info flex items-center mb-4">
            {currentTrack.album &&
            currentTrack.album.images &&
            currentTrack.album.images[0] ? (
              <img
                src={currentTrack.album.images[0].url}
                alt="Album Cover"
                className="w-[75px] h-[75px] mr-4 albussm object-fill"
              />
            ) : (
              <div className="w-[75px] h-[75px] mr-4 albussm bg-gray-500"></div> // placeholder for no album cover
            )}
            <div className="text-white">
              <h3 className="text-lg">{currentTrack.name}</h3>
              <p className="text-sm">{currentTrack.artists[0].name}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col w-[300px]  justify-between">
          <div className="controls flex items-center justify-center mb-[13px]">
            <button
              onClick={handlePrevTrack}
              className="mr-4 w-[32px] h-[32px]"
            >
              <img
                src={prevIcon}
                alt="Previous"
                className="w-[32px] h-[32px]"
              />
            </button>

            <button onClick={handleMusic} className="mr-4">
              <img
                src={isPlaying ? pauseMusic : playMusicIcon}
                alt="Play/Pause"
                className=""
              />
            </button>
            <button
              onClick={handleNextTrack}
              className="mr-4 w-[32px] h-[32px]"
            >
              <img src={nextIcon} alt="Next" className="w-[32px] h-[32px]" />
            </button>
            <button
              onClick={handleRestartTrack}
              className="mr-4 w-[32px] h-[32px]"
            >
              <img
                src={restartIcon}
                alt="Restart"
                className="w-[32px] h-[32px]"
              />
            </button>
          </div>
          <div
            className="progress-bar w-full h-2 bg-[#8B8B8B] rounded cursor-pointer mb-4"
            onClick={handleProgressClick}
            ref={progressRef}
          >
            <div
              className="progress h-full bg-[#fff] rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Footer;
