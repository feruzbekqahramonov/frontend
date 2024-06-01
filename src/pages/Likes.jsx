import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import LikedImg from "../assets/LikesBigImg.svg";
import user from "../assets/user.svg";
import playMusicIcon from "../assets/playMusicIcon.svg";
import pauseMusic from "../assets/pauseMusic.svg";
import DownLoad from "../assets/DownLoad.svg";
import unionn from "../assets/likeImg.svg";
import searchMusic from "../assets/searchMusic.svg";
import vectorof from "../assets/vectorof.svg";
import vectord from "../assets/vector.svg";
import left from "../assets/leftImg.svg";
import right from "../assets/rightImg.svg";
import { useNavigate } from "react-router-dom";
import playMusicIconn from "../assets/sss.svg";
import pauseMusics from "../assets/ddd.svg";
import { useSpring, animated } from "@react-spring/web";
import { ScaleLoader } from "react-spinners";
import prevIcon from "../assets/prev.svg";
import nextIcon from "../assets/next.svg";
import restartIcon from "../assets/restartIcon.svg";
const LikesWrapper = styled.div`
  width: 989px;
  min-height: 100vh;
  background-color: #121212;
`;

const TrackInfo = styled.div`
  position: sticky;
  width: 100%;
  bottom: 0px;
  background-color: #1a1a1a;
  padding: 10px 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Likes() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataLikesLocal, setDataLikesLocal] = useState([]);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dataLikes = localStorage.getItem("currentVectorTracks");
    if (dataLikes) {
      setDataLikesLocal(JSON.parse(dataLikes));
    }
  }, []);

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.preview_url;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  const handleRunClick = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackClick = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };



  const handleLikes = () => {
    navigate("/playlist/37i9dQZF1DWZ7eJRBxKzdO");
  };

  const handleMusicsCard = () => {
    navigate("/");
  };

  const springProps = useSpring({
    transform: isPlaying ? "scale(1.5)" : "scale(1)",
    config: { duration: 300 },
  });

  const handlePrevTrack = () => {
    if (dataLikesLocal.length > 0 && currentTrack) {
      const currentIndex = dataLikesLocal.findIndex(
        (track) => track.id === currentTrack.id
      );
      if (currentIndex > 0) {
        const prevTrack = dataLikesLocal[currentIndex - 1];
        setCurrentTrack(prevTrack);
        setIsPlaying(true);
      }
    }
  };

  const handleNextTrack = () => {
    if (dataLikesLocal.length > 0 && currentTrack) {
      const currentIndex = dataLikesLocal.findIndex(
        (track) => track.id === currentTrack.id
      );
      if (currentIndex < dataLikesLocal.length - 1) {
        const nextTrack = dataLikesLocal[currentIndex + 1];
        setCurrentTrack(nextTrack);
        setIsPlaying(true);
      }
    }
  };


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

  const handleRestartTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
      audioRef.current.play();
      setIsPlaying(true); 
      setProgress(0); 
    }
  };
  

  return (
    <LikesWrapper>
      <audio ref={audioRef}></audio>
      <div className="items-end bg-gradient-to-b from-[#604EC1] from-50% via-[#604EC1] via-50% to-[#121212] to-100% bg-100%">
        <div className="mb-[25px] pt-[20px] px-[15px]">
          <div className="flex items-center gap-[22px] ">
            <img
              onClick={handleLikes}
              className="cursor-pointer w-[40px] h-[40px]"
              src={right}
              alt=""
            />
            <img
              onClick={handleMusicsCard}
              className="cursor-pointer w-[40px] h-[40px]"
              src={left}
              alt=""
            />
          </div>
        </div>
        <div className="flex gap-[22px] items-end">
          <img src={LikedImg} alt="" className="shadow rounded-lg" />
          <div className="likesDescription mb-8 text-[#fff]">
            <p className="text-[16px] font-[500]">
              PUBLIC <br /> PLAYLIST
            </p>
            <h1 className="text-[60px] font-bold">Liked Songs</h1>
            <div className="flex items-center gap-2">
              <img src={user} alt="" />
              <p>davedirect3 • 34 songs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="run__Music px-8 flex justify-between">
        <div className="run__Music__block1 flex items-center gap-[20px] ">
          <span className="cursor-pointer">
            <img width={72} height={72} src={pauseMusic} alt="pause icon" />
          </span>
          <span className="cursor-pointer">
            <img width={29} height={29} src={vectorof} alt="vector icon" />
          </span>
          <span className="cursor-pointer">
            <img width={40} height={40} src={DownLoad} alt="Download icon" />
          </span>
          <span className="cursor-pointer">
            <img width={25} height={25} src={unionn} alt="Union icon" />
          </span>
        </div>
        <div className="run__Music__block2 flex items-center gap-5">
          <span className="cursor-pointer">
            <img width={25} height={25} src={searchMusic} alt="Search icon" />
          </span>
          <select className="bg-transparent outline-none text-white text-[16px] cursor-pointer">
            <option
              className="bg-transparent text-[16px] text-white"
              value="Custom order"
            >
              Custom order
            </option>
          </select>
        </div>
      </div>

      <div className="likedSongs px-4  py-4">
        {dataLikesLocal.length > 0 ? (
          dataLikesLocal.map((track, index) => (
            <div
              key={track.id}
              className={`trackItem flex items-center mt-[20px] h-[70px] justify-between py-2 cursor-pointer  border-gray-700 px-4 ${
                currentTrack?.id === track.id ? "bg-[#09421D]" : ""
              }`}
              onClick={() => handleTrackClick(track)}
            >
              <div className="trackInfo flex items-center gap-4">
                {currentTrack?.id === track.id ? (
                  <ScaleLoader
                    size={24}
                    color={"#1DB954"}
                    loading={true}
                    className="w-[50px]"
                  />
                ) : (
                  <p className="text-white text-lg w-[50px]">{index + 1}</p>
                )}
                <div className="flex items-center gap-[11px]">
                  <img
                    src={track.albumCover}
                    alt=""
                    className="w-[52px] h-[52px] object-fill"
                  />
                  <div className="flex flex-col text-start w-[230px]">
                    <p className="text-white text-lg">{track.name}</p>
                    <p className="text-[#B3B3B3] text-sm">{track.artists}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-[300px]">
                  <p className="text-[#B3B3B3] text-lg ">{track.name}</p>
                  <p className="track_duration text-[#fff] text-lg">
                    {Math.floor(track.duration / 60000)}:
                    {((track.duration % 60000) / 1000)
                      .toFixed(0)
                      .padStart(2, "0")}
                  </p>
                </div>
              </div>
              <div className="trackActions flex items-center gap-4">
                <span className="cursor-pointer">
                  <img width={20} height={20} src={unionn} alt="Union icon" />
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No liked songs found</p>
        )}
      </div>
      {currentTrack && (
        <TrackInfo>
          <div className="flex items-center">
            <img
              src={currentTrack.albumCover}
              alt="Track cover"
              width={75}
              height={75}
              className="mr-3"
            />
            <div>
              <p className="text-lg">{currentTrack.name}</p>
              <p className="text-sm text-gray-400">{currentTrack.artists}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center w-[400px] gap-4 justify-center">
              <img
                src={prevIcon}
                onClick={handlePrevTrack}
                className="w-[32px] h-[32px] cursor-pointer"
              ></img>
              <img
                className="cursor-pointer w-[48px] h-[48px]"
                width={30}
                height={30}
                src={isPlaying ? pauseMusics : playMusicIconn}
                alt={isPlaying ? "Pause icon" : "Play icon"}
                onClick={handleRunClick}
              />
              <img
                src={nextIcon}
                onClick={handleNextTrack}
                className="w-[32px] h-[32px] cursor-pointer"
              ></img>
              <img onClick={handleRestartTrack}
                className="w-[32px] h-[32px] cursor-pointer"
                src={restartIcon}
                alt=""
              />
            </div>
            <div
              className="progress-bar w-full h-2 bg-[#8B8B8B] rounded cursor-pointer mb-4 mt-[13px]"
              onClick={handleProgressClick}
              ref={progressRef}
            >
              <div
                className="progress h-full bg-[#fff] rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </TrackInfo>
      )}
    </LikesWrapper>
  );
}

export default Likes;
