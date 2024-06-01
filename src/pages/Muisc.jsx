import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import time from "../assets/time.svg";
import MusicFooter from "../components/Footer";
import playMusicIcon from "../assets/playMusicIcon.svg";
import pauseMusic from "../assets/pauseMusic.svg";
import DownLoad from "../assets/DownLoad.svg";
import unionn from "../assets/unionn.svg";
import searchMusic from "../assets/searchMusic.svg";
import vectorof from "../assets/vectorof.svg";
import vectord from "../assets/vector.svg";
import left from "../assets/leftImg.svg";
import right from "../assets/rightImg.svg";
import "./Muisc.css";

function Muisc() {
  const params = useParams();
  const token = localStorage.getItem("token");
  const [dataMain, setDataMain] = useState({});
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [run, setRun] = useState(false);
  const [vectorStates, setVectorStates] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    if (params.id) {
      fetch(`${import.meta.env.VITE_API_MUSIC}playlists/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDataMain(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.id, token]);

  useEffect(() => {
    const savedTrack = localStorage.getItem("currentTrack");
    if (savedTrack) {
      setCurrentTrack(JSON.parse(savedTrack));
    }
  }, []);

  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem("currentTrack", JSON.stringify(currentTrack));
    }
  }, [currentTrack]);

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.preview_url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMusic = () => {
    if (audioRef.current && currentTrack) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handlePrevTrack = () => {
    if (dataMain?.tracks?.items && currentTrack) {
      const currentIndex = dataMain.tracks.items.findIndex(
        (el) => el.track.id === currentTrack.id
      );
      if (currentIndex > 0) {
        const prevTrack = dataMain.tracks.items[currentIndex - 1].track;
        handleTrackClick(prevTrack);
      }
    }
  };

  const handleNextTrack = () => {
    if (dataMain?.tracks?.items && currentTrack) {
      const currentIndex = dataMain.tracks.items.findIndex(
        (el) => el.track.id === currentTrack.id
      );
      if (currentIndex < dataMain.tracks.items.length - 1) {
        const nextTrack = dataMain.tracks.items[currentIndex + 1].track;
        handleTrackClick(nextTrack);
      }
    }
  };

  const handleRestartTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  function handleRunCLick() {
    setRun(!run);
  }

  const handleVectorCLick = (track) => {
    setVectorStates((prevStates) => ({
      ...prevStates,
      [track.id]: !prevStates[track.id],
    }));

    const currentVectorTracks =
      JSON.parse(localStorage.getItem("currentVectorTracks")) || [];
    const trackIndex = currentVectorTracks.findIndex((t) => t.id === track.id);

    if (trackIndex === -1) {
      currentVectorTracks.push({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        duration: track.duration_ms,
        preview_url: track.preview_url,
        albumCover: track.album.images[0]?.url,
      });
    } else {
      currentVectorTracks.splice(trackIndex, 1);
    }

    localStorage.setItem(
      "currentVectorTracks",
      JSON.stringify(currentVectorTracks)
    );
  };
  const pagesNavigate = useNavigate();

  function handleHome() {
    pagesNavigate("/");
  }

  function handleLiked() {
    pagesNavigate("/likes");
  }
  return (
    <div>
      <div className="Muisc_wrapper flex-col bg-[#121212] w-[765px]">
        <div className="header w-[765px] pt-[28px] bg-gradient-to-b from-[#cade2f] from-2% via-[#8b8b3d] via-5% to-[#121212] to-100% bg-100%">
          <div className="flex items-center px-8 gap-[22px]">
            <img
              onClick={handleHome}
              className="cursor-pointer w-[40px] h-[40px]"
              src={right}
              alt=""
            />
            <img
              onClick={handleLiked}
              className="cursor-pointer w-[40px] h-[40px]"
              src={left}
              alt=""
            />
          </div>

          <div className="header_content flex px-8 gap-10 w-[765px] items-center">
            <div>
              {dataMain.images?.[0]?.url ? (
                <img
                  className="playlist_cover w-[397px] height-[397px] shadow-xl object-fill"
                  src={dataMain.images[0].url}
                  alt="Playlist Cover"
                />
              ) : (
                <div className="playlist_cover no_image">No Image</div>
              )}
            </div>
            <div className="playlist_info w-[609px]">
              <span className="playlist_type text-white text-[16px]">
                PUBLIC PLAYLIST
              </span>
              <h3 className="playlist_name uppercase text-[55px] text-white font-bold">
                {dataMain.name}
              </h3>
              <p className="playlist_description text-white">
                {dataMain.description}
              </p>
            </div>
          </div>
          <div className="run__Music px-8 flex justify-between">
            <div className="run__Music__block1 flex items-center gap-[20px] ">
              <span className="cursor-pointer" onClick={handleRunCLick}>
                {run ? (
                  <img
                    width={72}
                    height={72}
                    src={pauseMusic}
                    alt="pause icon"
                  />
                ) : (
                  <img
                    width={72}
                    height={72}
                    src={playMusicIcon}
                    alt="play icon"
                  />
                )}
              </span>
              <span
                className="cursor-pointer "
                onClick={() => handleVectorCLick(currentTrack)}
              >
                {vectorStates[currentTrack?.id] ? (
                  <img width={29} height={29} src={vectord} alt="vector icon" />
                ) : (
                  <img
                    width={29}
                    height={29}
                    src={vectorof}
                    alt="vector icon"
                  />
                )}
              </span>
              <span className="cursor-pointer">
                <img
                  width={40}
                  height={40}
                  src={DownLoad}
                  alt="Download icon"
                />
              </span>
              <span className="cursor-pointer">
                <img width={25} height={25} src={unionn} alt="Union icon" />
              </span>
            </div>
            <div className="run__Music__block2 flex items-center gap-5">
              <span className="cursor-pointer">
                <img
                  width={25}
                  height={25}
                  src={searchMusic}
                  alt="Union icon"
                />
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
        </div>
        <div className="musics w-[765px] px-4">
          <div className="musics_header w-[765px] mx-auto flex items-center text-[#B3B3B3] justify-between p-4 px-8 border-b mb-[22px]">
            <p># TITLE</p>
            <div className="musics_header_info w-[60%] flex items-center justify-between">
              <p>ALBUM</p>
              <p>DATE ADDED</p>
              <img src={time} alt="Time Icon" />
            </div>
          </div>
          <div className="music_wrapper flex flex-col px-4">
            {dataMain?.tracks?.items &&
              dataMain.tracks.items.map((el, index) => (
                <div
                  className={`music_card text-[#B3B3B3] flex items-center justify-between cursor-pointer mb-4 hover:bg-[#2A2A2A] p-3 py-2 ${
                    currentTrack?.id === el.track.id ? "playing" : ""
                  }`}
                  key={index}
                  onClick={() => handleTrackClick(el.track)}
                >
                  <div className="flex items-center justify-between">
                    <div className="music_title flex items-center w-[299px] gap-[11px]">
                      <div
                        className={`text-[24px] ${
                          currentTrack?.id === el.track.id
                            ? "playingIndex"
                            : "musicIndex"
                        }`}
                      >
                        {currentTrack?.id === el.track.id ? (
                          <ScaleLoader
                            size={24}
                            color={"#1DB954"}
                            loading={true}
                          />
                        ) : (
                          <p className="text-white text-lg">{index + 1}</p>
                        )}
                      </div>
                      <img
                        src={el.track.album?.images[0]?.url}
                        alt=""
                        className="album_cover w-[52px] h-[52px] object-fill"
                      />
                      <div>
                        <p className="track_name text-[#fff] text-lg">
                          {el.track.name}
                        </p>
                        <p className="track_artist">
                          {el.track.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <p className="album_type w-[100px]">
                      {el.track.album.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-[20px]">
                    <span
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVectorCLick(el.track);
                      }}
                    >
                      {vectorStates[el.track.id] ? (
                        <img
                          width={29}
                          height={29}
                          src={vectord}
                          alt="vector icon"
                        />
                      ) : (
                        <img
                          width={29}
                          height={29}
                          src={vectorof}
                          alt="vector icon"
                        />
                      )}
                    </span>
                    <p className="track_duration text-[#fff] text-lg">
                      {Math.floor(el.track.duration_ms / 60000)}:
                      {((el.track.duration_ms % 60000) / 1000)
                        .toFixed(0)
                        .padStart(2, "0")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <MusicFooter
        isPlaying={isPlaying}
        handleMusic={handleMusic}
        audioRef={audioRef}
        handlePrevTrack={handlePrevTrack}
        handleNextTrack={handleNextTrack}
        handleRestartTrack={handleRestartTrack}
        currentTrack={currentTrack}
      />
      <audio ref={audioRef} />
    </div>
  );
}

export default Muisc;
