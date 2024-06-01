import React from "react";
import styled from "@emotion/styled";
import home from "../assets/home.svg";
import likes from "../assets/likes.svg";
import linbary from "../assets/linbary.svg";
import playList from "../assets/playList.svg";
import Search from "../assets/Search.svg";
import "./comp.css";
import { Link } from "react-router-dom";
function LeftSidebar() {
  const SidebarWrapper = styled.div`
    width: 300px;
    min-height: 100vh;
    background-color: black;
    color: #b3b3b3;
    padding: 70px 29px;
  `;
  return (
    <SidebarWrapper>
      <div className="sideWrapeer_title fixed">
        <div className="sideWrapeer_title_header">
          <div className="sideWrapper_header">
            <Link to="/" className="sideWrapeer_title_header-title">
              <img src={home} alt="" />
              <p>Home</p>
            </Link>
            <div className="sideWrapeer_title_header-title">
              <img src={Search} alt="" />
              <p>Search</p>
            </div>
            <div className="sideWrapeer_title_header-title">
              <img src={linbary} alt="" />
              <p>Your Library</p>
            </div>
          </div>
          <div className="sideWrapeer_title_header-title">
            <img src={playList} alt="" />
            <p>Create Playlist</p>
          </div>
          <Link to="/likes" className="sideWrapeer_title_header-title">
            <img src={likes} alt="" />
            <p>Liked Songs</p>
          </Link>
          <hr />
        </div>

        <div className="sideWrapeer_title_description">
          <p>Chill Mix</p>
          <p>Insta Hits</p>
          <p>Your Top Songs 2021</p>
          <p>Mellow Songs</p>
          <p>Anime Lofi & Chillhop Music</p>
          <p>BG Afro “Select” Vibes</p>
          <p>Afro “Select” Vibes</p>
          <p>Happy Hits!</p>
          <p>Deep Focus</p>
          <p>Instrumental Study</p>
          <p>OST Compilations</p>
          <p>Nostalgia for old souled mill...</p>
          <p>Mixed Feelings</p>
        </div>
      </div>
    </SidebarWrapper>
  );
}

export default LeftSidebar;
